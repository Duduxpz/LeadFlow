import { prisma } from '../lib/db'

export interface CreateAtividadeInput {
  tipo: string // chamada, email, reuniao, nota, sms
  descricao: string
  leadId: string
  usuarioId: string
}

export class AtividadeRepository {
  async create(data: CreateAtividadeInput) {
    return prisma.atividade.create({
      data,
      include: {
        lead: true,
        usuario: { select: { id: true, nome: true, email: true } },
      },
    })
  }

  async findByLeadId(leadId: string, take = 50) {
    return prisma.atividade.findMany({
      where: { leadId },
      include: {
        usuario: { select: { id: true, nome: true, email: true } },
      },
      orderBy: { criadaEm: 'desc' },
      take,
    })
  }

  async findById(id: string) {
    return prisma.atividade.findUnique({
      where: { id },
      include: {
        lead: true,
        usuario: { select: { id: true, nome: true, email: true } },
      },
    })
  }

  async findByUsuarioId(usuarioId: string, take = 50) {
    return prisma.atividade.findMany({
      where: { usuarioId },
      include: {
        lead: true,
      },
      orderBy: { criadaEm: 'desc' },
      take,
    })
  }

  async countByLeadId(leadId: string) {
    return prisma.atividade.count({
      where: { leadId },
    })
  }
}

export const atividadeRepository = new AtividadeRepository()
