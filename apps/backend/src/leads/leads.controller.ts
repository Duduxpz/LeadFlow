import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('leads')
@UseGuards(JwtAuthGuard)
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  async create(@Body() createLeadDto: any, @GetUser() user: any) {
    return this.leadsService.create(createLeadDto, user.tenantId);
  }

  @Get()
  async findAll(@GetUser() user: any) {
    return this.leadsService.findAll(user.tenantId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser() user: any) {
    return this.leadsService.findOne(id, user.tenantId);
  }
}
