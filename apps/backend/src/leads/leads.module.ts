import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { WebhooksController } from './webhooks.controller';

@Module({
  providers: [LeadsService],
  controllers: [LeadsController, WebhooksController],
  exports: [LeadsService],
})
export class LeadsModule {}
