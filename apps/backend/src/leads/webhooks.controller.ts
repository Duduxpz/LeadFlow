import { Controller, Post, Body, Param, Query } from '@nestjs/common';
import { LeadsService } from './leads.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post('capture/:tenantId')
  async capture(
    @Param('tenantId') tenantId: string,
    @Body() leadData: any,
    @Query('source') source: string,
  ) {
    // Basic mapping from common webhook formats
    const mappedLead = {
      name:
        leadData.name ||
        leadData.fullName ||
        leadData.first_name ||
        'Desconhecido',
      email: leadData.email || leadData.email_address,
      phone: leadData.phone || leadData.phone_number || leadData.whatsapp,
      message: leadData.message || leadData.text || leadData.body || '',
      source: source || leadData.source || 'Webhook',
      extra: leadData,
    };

    return this.leadsService.create(mappedLead, tenantId);
  }
}
