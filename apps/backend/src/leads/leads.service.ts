import { Injectable } from '@nestjs/common'
import { leadsRepository, CreateLeadInput, UpdateLeadInput } from '../repositories/leads.repository'

export interface ListLeadsQuery {
  status?: string
  origem?: string
  page?: number
  limit?: number
}

@Injectable()
export class LeadsService {
  async create(data: CreateLeadInput) {
    return leadsRepository.create(data)
  }

  async findAll(query: ListLeadsQuery) {
    const page = query.page || 1
    const limit = query.limit || 10
    const skip = (page - 1) * limit

    return leadsRepository.findAll({
      status: query.status,
      origem: query.origem,
      skip,
      take: limit,
    })
  }

  async findById(id: string) {
    return leadsRepository.findById(id)
  }

  async update(id: string, data: UpdateLeadInput) {
    return leadsRepository.update(id, data)
  }

  async delete(id: string) {
    return leadsRepository.delete(id)
  }

  async moveToEtapa(leadId: string, etapaId: string) {
    return leadsRepository.moveToEtapa(leadId, etapaId)
  }

  async addTag(leadId: string, tagId: string) {
    return leadsRepository.addTag(leadId, tagId)
  }

  async removeTag(leadId: string, tagId: string) {
    return leadsRepository.removeTag(leadId, tagId)
  }
}
