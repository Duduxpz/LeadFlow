import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any, tenantId: string) {
    const classification = this.classifyLead(data.message || '');

    return this.prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        source: data.source,
        data: data.extra || {},
        tenantId,
        tag: classification.tag,
        intentScore: classification.score,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.lead.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.lead.findFirst({
      where: { id, tenantId },
    });
  }

  private classifyLead(message: string): { tag: string; score: number } {
    const msg = message.toLowerCase();

    // Simple keyword-based classification for MVP
    if (
      msg.includes('comprar') ||
      msg.includes('fechar') ||
      msg.includes('assinar')
    ) {
      return { tag: 'Fechamento', score: 0.9 };
    }
    if (
      msg.includes('preço') ||
      msg.includes('valor') ||
      msg.includes('quanto custa') ||
      msg.includes('orçamento')
    ) {
      return { tag: 'Orçamento', score: 0.7 };
    }
    if (
      msg.includes('quero saber mais') ||
      msg.includes('como funciona') ||
      msg.includes('tenho interesse')
    ) {
      return { tag: 'Interessado', score: 0.5 };
    }

    return { tag: 'Curioso', score: 0.2 };
  }
}
