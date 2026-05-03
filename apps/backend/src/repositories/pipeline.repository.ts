import { prisma } from '../lib/db'

export interface CreatePipelineInput {
  nome: string
  descricao?: string
}

export interface CreateEtapaInput {
  nome: string
  ordem: number
  cor?: string
}

export class PipelineRepository {
  async createPipeline(data: CreatePipelineInput) {
    return prisma.pipeline.create({
      data,
      include: { etapas: true },
    })
  }

  async findPipelineById(id: string) {
    return prisma.pipeline.findUnique({
      where: { id },
      include: { etapas: { orderBy: { ordem: 'asc' } } },
    })
  }

  async findAllPipelines() {
    return prisma.pipeline.findMany({
      include: { etapas: { orderBy: { ordem: 'asc' } } },
    })
  }

  async createEtapa(pipelineId: string, data: CreateEtapaInput) {
    return prisma.etapa.create({
      data: {
        ...data,
        pipelineId,
      },
      include: { pipeline: true },
    })
  }

  async findEtapaById(id: string) {
    return prisma.etapa.findUnique({
      where: { id },
      include: { pipeline: true },
    })
  }

  async findEtapasByPipeline(pipelineId: string) {
    return prisma.etapa.findMany({
      where: { pipelineId },
      orderBy: { ordem: 'asc' },
    })
  }

  async updateEtapa(id: string, data: Partial<CreateEtapaInput>) {
    return prisma.etapa.update({
      where: { id },
      data,
      include: { pipeline: true },
    })
  }

  async deleteEtapa(id: string) {
    return prisma.etapa.delete({
      where: { id },
    })
  }
}

export const pipelineRepository = new PipelineRepository()
