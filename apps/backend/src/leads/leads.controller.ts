import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common'
import { LeadsService } from './leads.service'
import { z } from 'zod'

// Validation Schemas
const CreateLeadSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido').optional(),
  telefone: z.string().optional(),
  empresa: z.string().optional(),
  status: z.string().optional().default('novo'),
  score: z.number().min(0).max(100).optional().default(0),
  origem: z.string().optional().default('formulario'),
})

const UpdateLeadSchema = z.object({
  nome: z.string().optional(),
  email: z.string().email('Email inválido').optional(),
  telefone: z.string().optional(),
  empresa: z.string().optional(),
  status: z.string().optional(),
  score: z.number().min(0).max(100).optional(),
})

const MoveLeadSchema = z.object({
  etapaId: z.string().min(1, 'etapaId é obrigatório'),
})

@Controller('api/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  // List leads with pagination and filters
  @Get()
  async findAll(@Query() query: any) {
    try {
      const page = parseInt(query.page) || 1
      const limit = parseInt(query.limit) || 10
      const status = query.status
      const origem = query.origem

      const result = await this.leadsService.findAll({
        page,
        limit,
        status,
        origem,
      })

      return {
        data: result.data,
        meta: {
          total: result.total,
          page: result.page,
          pageSize: result.pageSize,
          totalPages: result.totalPages,
        },
        error: null,
      }
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          error: error.message,
          meta: null,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  // Get lead by ID with activities
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const lead = await this.leadsService.findById(id)

      if (!lead) {
        throw new HttpException(
          {
            data: null,
            error: 'Lead não encontrado',
            meta: null,
          },
          HttpStatus.NOT_FOUND,
        )
      }

      return {
        data: lead,
        error: null,
        meta: {
          timestamp: new Date().toISOString(),
        },
      }
    } catch (error) {
      if (error.status) throw error
      throw new HttpException(
        {
          data: null,
          error: error.message,
          meta: null,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  // Create new lead
  @Post()
  async create(@Body() createLeadDto: any) {
    try {
      const validatedData = CreateLeadSchema.parse(createLeadDto)
      const lead = await this.leadsService.create(validatedData)

      return {
        data: lead,
        error: null,
        meta: {
          timestamp: new Date().toISOString(),
          created: true,
        },
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new HttpException(
          {
            data: null,
            error: 'Erro de validação',
            meta: { validationErrors: error.errors },
          },
          HttpStatus.BAD_REQUEST,
        )
      }
      throw new HttpException(
        {
          data: null,
          error: error.message,
          meta: null,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  // Update lead
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLeadDto: any) {
    try {
      // Check if lead exists
      const existingLead = await this.leadsService.findById(id)
      if (!existingLead) {
        throw new HttpException(
          {
            data: null,
            error: 'Lead não encontrado',
            meta: null,
          },
          HttpStatus.NOT_FOUND,
        )
      }

      const validatedData = UpdateLeadSchema.parse(updateLeadDto)
      const updatedLead = await this.leadsService.update(id, validatedData)

      return {
        data: updatedLead,
        error: null,
        meta: {
          timestamp: new Date().toISOString(),
          updated: true,
        },
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new HttpException(
          {
            data: null,
            error: 'Erro de validação',
            meta: { validationErrors: error.errors },
          },
          HttpStatus.BAD_REQUEST,
        )
      }
      if (error.status) throw error
      throw new HttpException(
        {
          data: null,
          error: error.message,
          meta: null,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  // Delete lead
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const existingLead = await this.leadsService.findById(id)
      if (!existingLead) {
        throw new HttpException(
          {
            data: null,
            error: 'Lead não encontrado',
            meta: null,
          },
          HttpStatus.NOT_FOUND,
        )
      }

      await this.leadsService.delete(id)

      return {
        data: null,
        error: null,
        meta: {
          timestamp: new Date().toISOString(),
          deleted: true,
          deletedId: id,
        },
      }
    } catch (error) {
      if (error.status) throw error
      throw new HttpException(
        {
          data: null,
          error: error.message,
          meta: null,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  // Move lead to another etapa
  @Patch(':id/etapa')
  async moveToEtapa(@Param('id') id: string, @Body() moveDto: any) {
    try {
      const existingLead = await this.leadsService.findById(id)
      if (!existingLead) {
        throw new HttpException(
          {
            data: null,
            error: 'Lead não encontrado',
            meta: null,
          },
          HttpStatus.NOT_FOUND,
        )
      }

      const validatedData = MoveLeadSchema.parse(moveDto)
      const result = await this.leadsService.moveToEtapa(id, validatedData.etapaId)

      return {
        data: result,
        error: null,
        meta: {
          timestamp: new Date().toISOString(),
          moved: true,
        },
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new HttpException(
          {
            data: null,
            error: 'Erro de validação',
            meta: { validationErrors: error.errors },
          },
          HttpStatus.BAD_REQUEST,
        )
      }
      if (error.status) throw error
      throw new HttpException(
        {
          data: null,
          error: error.message,
          meta: null,
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
