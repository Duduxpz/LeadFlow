import { prisma } from '../lib/db'

export interface CreateLeadInput {
  nome: string
  email?: string
  telefone?: string
  empresa?: string
  status?: string
  score?: number
  origem?: string
}

export interface UpdateLeadInput {
  nome?: string
  email?: string
  telefone?: string
  empresa?: string
  status?: string
  score?: number
}

export interface ListLeadsFilters {
  status?: string
  origem?: string
  skip?: number
  take?: number
}

export class LeadsRepository {
  async create(data: CreateLeadInput) {
    return prisma.lead.create({
      data,
      include: {
        etapas: true,
        atividades: true,
        tags: true,
      },
    })
  }

  async findById(id: string) {
    return prisma.lead.findUnique({
      where: { id },
      include: {
        etapas: {
          include: { etapa: { include: { pipeline: true } } },
        },
        atividades: {
          include: { usuario: { select: { id: true, nome: true, email: true } } },
          orderBy: { criadaEm: 'desc' },
        },
        tags: { include: { tag: true } },
      },
    })
  }

  async findAll(filters: ListLeadsFilters = {}) {
    const { status, origem, skip = 0, take = 10 } = filters

    const where: any = {}
    if (status) where.status = status
    if (origem) where.origem = origem

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip,
        take,
        include: {
          etapas: true,
          atividades: { take: 3 },
          tags: true,
        },
        orderBy: { criadoEm: 'desc' },
      }),
      prisma.lead.count({ where }),
    ])

    return {
      data: leads,
      total,
      page: Math.floor(skip / take) + 1,
      pageSize: take,
      totalPages: Math.ceil(total / take),
    }
  }

  async update(id: string, data: UpdateLeadInput) {
    return prisma.lead.update({
      where: { id },
      data,
      include: {
        etapas: true,
        atividades: true,
        tags: true,
      },
    })
  }

  async delete(id: string) {
    return prisma.lead.delete({
      where: { id },
    })
  }

  async moveToEtapa(leadId: string, etapaId: string) {
    return prisma.leadEtapa.upsert({
      where: {
        leadId_etapaId: {
          leadId,
          etapaId,
        },
      },
      update: { movidoEm: new Date() },
      create: { leadId, etapaId },
      include: {
        lead: true,
        etapa: { include: { pipeline: true } },
      },
    })
  }

  async findByEmail(email: string) {
    return prisma.lead.findFirst({
      where: { email },
    })
  }

  async addTag(leadId: string, tagId: string) {
    return prisma.leadTag.create({
      data: { leadId, tagId },
      include: { tag: true },
    })
  }

  async removeTag(leadId: string, tagId: string) {
    return prisma.leadTag.delete({
      where: {
        leadId_tagId: { leadId, tagId },
      },
    })
  }
}

export const leadsRepository = new LeadsRepository()
