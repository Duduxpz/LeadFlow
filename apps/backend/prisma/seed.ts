/* eslint-disable */
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  try {
    // Clear existing data
    await prisma.leadTag.deleteMany({})
    await prisma.leadEtapa.deleteMany({})
    await prisma.atividade.deleteMany({})
    await prisma.lead.deleteMany({})
    await prisma.etapa.deleteMany({})
    await prisma.tag.deleteMany({})
    await prisma.pipeline.deleteMany({})
    await prisma.usuario.deleteMany({})

    // Create Users
    const users = await Promise.all([
      prisma.usuario.create({
        data: {
          nome: 'Admin User',
          email: 'admin@leadflow.com',
          senha: await bcrypt.hash('admin123', 10),
          role: 'admin',
        },
      }),
      prisma.usuario.create({
        data: {
          nome: 'João Silva',
          email: 'joao@leadflow.com',
          senha: await bcrypt.hash('senha123', 10),
          role: 'gerente',
        },
      }),
      prisma.usuario.create({
        data: {
          nome: 'Maria Santos',
          email: 'maria@leadflow.com',
          senha: await bcrypt.hash('senha123', 10),
          role: 'usuario',
        },
      }),
    ])

    console.log('✅ Created 3 users')

    // Create Tags
    const tags = await Promise.all([
      prisma.tag.create({ data: { nome: 'Interessado', cor: '#10B981' } }),
      prisma.tag.create({ data: { nome: 'Em Negociação', cor: '#F59E0B' } }),
      prisma.tag.create({ data: { nome: 'Orçamento Enviado', cor: '#3B82F6' } }),
      prisma.tag.create({ data: { nome: 'Perdido', cor: '#EF4444' } }),
      prisma.tag.create({ data: { nome: 'VIP', cor: '#8B5CF6' } }),
    ])

    console.log('✅ Created 5 tags')

    // Create Pipelines
    const pipeline1 = await prisma.pipeline.create({
      data: {
        nome: 'Pipeline de Vendas',
        descricao: 'Pipeline para gerenciar prospects e deals',
      },
    })

    const pipeline2 = await prisma.pipeline.create({
      data: {
        nome: 'Pipeline de Suporte',
        descricao: 'Pipeline para gerenciar tickets de suporte',
      },
    })

    console.log('✅ Created 2 pipelines')

    // Create Etapas for Pipeline 1
    const etapas1 = await Promise.all([
      prisma.etapa.create({
        data: {
          nome: 'Lead Novo',
          ordem: 1,
          cor: '#E5E7EB',
          pipelineId: pipeline1.id,
        },
      }),
      prisma.etapa.create({
        data: {
          nome: 'Contactado',
          ordem: 2,
          cor: '#DBEAFE',
          pipelineId: pipeline1.id,
        },
      }),
      prisma.etapa.create({
        data: {
          nome: 'Qualificado',
          ordem: 3,
          cor: '#DCFCE7',
          pipelineId: pipeline1.id,
        },
      }),
      prisma.etapa.create({
        data: {
          nome: 'Proposta Enviada',
          ordem: 4,
          cor: '#FEF3C7',
          pipelineId: pipeline1.id,
        },
      }),
      prisma.etapa.create({
        data: {
          nome: 'Fechado',
          ordem: 5,
          cor: '#DCFCE7',
          pipelineId: pipeline1.id,
        },
      }),
    ])

    // Create Etapas for Pipeline 2
    const etapas2 = await Promise.all([
      prisma.etapa.create({
        data: {
          nome: 'Aberto',
          ordem: 1,
          cor: '#FEE2E2',
          pipelineId: pipeline2.id,
        },
      }),
      prisma.etapa.create({
        data: {
          nome: 'Em Análise',
          ordem: 2,
          cor: '#FEF3C7',
          pipelineId: pipeline2.id,
        },
      }),
      prisma.etapa.create({
        data: {
          nome: 'Em Andamento',
          ordem: 3,
          cor: '#DBEAFE',
          pipelineId: pipeline2.id,
        },
      }),
      prisma.etapa.create({
        data: {
          nome: 'Aguardando Cliente',
          ordem: 4,
          cor: '#E9D5FF',
          pipelineId: pipeline2.id,
        },
      }),
      prisma.etapa.create({
        data: {
          nome: 'Resolvido',
          ordem: 5,
          cor: '#DCFCE7',
          pipelineId: pipeline2.id,
        },
      }),
    ])

    console.log('✅ Created 10 etapas (5 per pipeline)')

    // Create Sample Leads
    const leads = await Promise.all([
      prisma.lead.create({
        data: {
          nome: 'Acme Corporation',
          email: 'contact@acme.com',
          telefone: '(11) 98765-4321',
          empresa: 'Acme Corp',
          status: 'novo',
          score: 85,
          origem: 'formulario',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Tech Solutions Ltd',
          email: 'hello@techsol.com',
          telefone: '(21) 97654-3210',
          empresa: 'Tech Solutions',
          status: 'contactado',
          score: 72,
          origem: 'google',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Global Industries',
          email: 'sales@global.com',
          telefone: '(31) 96543-2109',
          empresa: 'Global Inc',
          status: 'qualificado',
          score: 90,
          origem: 'instagram',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'StartUp X',
          email: 'info@startupx.com',
          telefone: '(41) 95432-1098',
          empresa: 'StartUp X',
          status: 'novo',
          score: 65,
          origem: 'whatsapp',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Digital Agency Pro',
          email: 'contact@dagencypro.com',
          telefone: '(51) 94321-0987',
          empresa: 'Digital Agency',
          status: 'contactado',
          score: 78,
          origem: 'facebook',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Finance Plus',
          email: 'sales@financeplus.com',
          telefone: '(61) 93210-9876',
          empresa: 'Finance Plus',
          status: 'qualificado',
          score: 88,
          origem: 'google',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Marketing Cloud',
          email: 'team@marketingcloud.com',
          telefone: '(71) 92109-8765',
          empresa: 'Marketing Cloud',
          status: 'novo',
          score: 55,
          origem: 'formulario',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Enterprise Solutions',
          email: 'enterprise@esolutions.com',
          telefone: '(81) 91098-7654',
          empresa: 'Enterprise Sol',
          status: 'contactado',
          score: 92,
          origem: 'instagram',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Local Business Hub',
          email: 'info@localbiz.com',
          telefone: '(85) 90987-6543',
          empresa: 'Local Biz',
          status: 'novo',
          score: 62,
          origem: 'facebook',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Cloud Systems Inc',
          email: 'contact@cloudsys.com',
          telefone: '(91) 89876-5432',
          empresa: 'Cloud Systems',
          status: 'qualificado',
          score: 95,
          origem: 'google',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Creative Studio',
          email: 'hello@creativestudio.com',
          telefone: '(11) 98765-0001',
          empresa: 'Creative Studio',
          status: 'contactado',
          score: 75,
          origem: 'whatsapp',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Retail Network',
          email: 'sales@retailnet.com',
          telefone: '(21) 97654-0002',
          empresa: 'Retail Network',
          status: 'novo',
          score: 68,
          origem: 'formulario',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Health Services Co',
          email: 'info@healthserv.com',
          telefone: '(31) 96543-0003',
          empresa: 'Health Services',
          status: 'qualificado',
          score: 87,
          origem: 'google',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Education Plus',
          email: 'contact@eduplus.com',
          telefone: '(41) 95432-0004',
          empresa: 'Education Plus',
          status: 'contactado',
          score: 70,
          origem: 'instagram',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Real Estate Group',
          email: 'sales@regroup.com',
          telefone: '(51) 94321-0005',
          empresa: 'Real Estate',
          status: 'novo',
          score: 58,
          origem: 'facebook',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Logistics Express',
          email: 'info@logexpress.com',
          telefone: '(61) 93210-0006',
          empresa: 'Logistics Exp',
          status: 'qualificado',
          score: 91,
          origem: 'google',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Food & Beverage Co',
          email: 'contact@fbco.com',
          telefone: '(71) 92109-0007',
          empresa: 'F&B Company',
          status: 'contactado',
          score: 73,
          origem: 'whatsapp',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Manufacturing Ltd',
          email: 'sales@manufact.com',
          telefone: '(81) 91098-0008',
          empresa: 'Manufacturing',
          status: 'novo',
          score: 66,
          origem: 'formulario',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Travel & Tourism',
          email: 'info@traveltourism.com',
          telefone: '(85) 90987-0009',
          empresa: 'Travel Tourism',
          status: 'qualificado',
          score: 79,
          origem: 'instagram',
        },
      }),
      prisma.lead.create({
        data: {
          nome: 'Media Productions',
          email: 'hello@mediaprod.com',
          telefone: '(91) 89876-0010',
          empresa: 'Media Prod',
          status: 'contactado',
          score: 81,
          origem: 'google',
        },
      }),
    ])

    console.log('✅ Created 20 sample leads')

    // Assign leads to etapas randomly
    for (const lead of leads) {
      const randomEtapa =
        Math.random() > 0.5
          ? etapas1[Math.floor(Math.random() * etapas1.length)]
          : etapas2[Math.floor(Math.random() * etapas2.length)]

      await prisma.leadEtapa.create({
        data: {
          leadId: lead.id,
          etapaId: randomEtapa.id,
        },
      })
    }

    console.log('✅ Assigned leads to etapas')

    // Assign random tags to leads
    for (const lead of leads.slice(0, 15)) {
      const randomTags = tags.sort(() => Math.random() - 0.5).slice(0, 2)
      for (const tag of randomTags) {
        await prisma.leadTag.create({
          data: {
            leadId: lead.id,
            tagId: tag.id,
          },
        })
      }
    }

    console.log('✅ Assigned tags to leads')

    // Create sample activities
    for (const lead of leads.slice(0, 10)) {
      const activityTypes = ['chamada', 'email', 'reuniao', 'nota', 'sms']
      const descriptions = [
        'Primeiro contato realizado',
        'Lead mostrou interesse',
        'Agendada reunião para próxima semana',
        'Enviado orçamento por email',
        'Cliente retornou com dúvidas',
      ]

      for (let i = 0; i < 2; i++) {
        await prisma.atividade.create({
          data: {
            tipo: activityTypes[Math.floor(Math.random() * activityTypes.length)],
            descricao:
              descriptions[Math.floor(Math.random() * descriptions.length)],
            leadId: lead.id,
            usuarioId: users[Math.floor(Math.random() * users.length)].id,
          },
        })
      }
    }

    console.log('✅ Created sample activities')

    console.log('🎉 Database seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })
