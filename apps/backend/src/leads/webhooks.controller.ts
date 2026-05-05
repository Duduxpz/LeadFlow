import { Controller, Post, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { LeadsService } from './leads.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post('capture/:id')
  async capture(
    @Param('id') leadId: string,
    @Body() leadData: any,
    @Query('source') source: string,
  ) {
    try {
      // Basic mapping from common webhook formats to our model
      const mappedLead = {
        nome: leadData.name || leadData.fullName || leadData.nome || 'Desconhecido',
        email: leadData.email || leadData.email_address || leadData.email,
        telefone: leadData.phone || leadData.phone_number || leadData.whatsapp || leadData.telefone,
        empresa: leadData.company || leadData.empresa,
        status: leadData.status || 'novo',
        origem: source || leadData.source || leadData.origem || 'webhook',
      };

      // Remove undefined fields
      Object.keys(mappedLead).forEach((key) => {
        if (mappedLead[key] === undefined) {
          delete mappedLead[key];
        }
      });

      const result = await this.leadsService.create(mappedLead);

      return {
        data: result,
        error: null,
        meta: {
          timestamp: new Date().toISOString(),
          created: true,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          error: error.message || 'Erro ao capturar lead do webhook',
          meta: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
