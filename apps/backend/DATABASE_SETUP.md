# 🗄️ LeadFlow - Database Setup Guide

## 📋 Overview

O LeadFlow usa **SQLite** como banco de dados embutido + **Prisma ORM** para gerenciar schema, migrations e queries. Zero configuração de servidor!

### Estrutura Criada
```
apps/backend/
├── prisma/
│   ├── schema.prisma          # ✅ Schema completo com todos os models
│   ├── seed.ts                # ✅ Script de seeding com dados iniciais
│   └── migrations/            # 📁 Gerada automaticamente
├── src/
│   ├── lib/
│   │   └── db.ts              # ✅ PrismaClient singleton
│   └── repositories/
│       ├── leads.repository.ts       # ✅ CRUD + busca + paginação
│       ├── pipeline.repository.ts    # ✅ CRUD pipelines + etapas
│       └── atividade.repository.ts   # ✅ CRUD atividades
├── .env                       # ✅ DATABASE_URL="file:./leadflow.db"
└── package.json               # ✅ Scripts de DB adicionados
```

## 🚀 Quickstart

### 1️⃣ **Instalar dependências** (se ainda não instalou)
```bash
cd apps/backend
npm install
```

### 2️⃣ **Gerar migrations e criar o banco**
```bash
npm run db:migrate
```
Isso:
- Cria `leadflow.db` (arquivo SQLite local)
- Gera migrations em `prisma/migrations/`
- Aplica as migrations ao banco

### 3️⃣ **Seeder o banco com dados iniciais**
```bash
npm run db:seed
```
Cria automaticamente:
- ✅ 3 usuários (admin, gerente, usuário)
- ✅ 2 pipelines (Vendas, Suporte)
- ✅ 10 etapas (5 por pipeline)
- ✅ 20 leads fictícios
- ✅ 5 tags
- ✅ Atividades de exemplo

### 4️⃣ **Abrir Prisma Studio** (visualizar dados no browser)
```bash
npm run db:studio
```
Abre em `http://localhost:5555` - incrível ferramenta visual!

## 📊 Models do Database

### Lead
- `id` (PK)
- `nome, email, telefone, empresa`
- `status` (novo, contactado, qualificado, perdido, ganho)
- `score` (0-100)
- `origem` (formulario, whatsapp, instagram, facebook, google)
- `criadoEm, atualizadoEm`

### Pipeline & Etapa
- **Pipeline**: nome, descricao
- **Etapa**: nome, ordem, cor, pipelineId

### LeadEtapa
- Relacionamento M2M entre Lead e Etapa
- `movidoEm` timestamp

### Usuario
- `nome, email, senha, role` (admin, gerente, usuario)

### Atividade
- `tipo` (chamada, email, reuniao, nota, sms)
- `descricao, leadId, usuarioId`

### Tag & LeadTag
- Tags para categorizar leads
- Relacionamento M2M

## 🛠️ Scripts Disponíveis

```bash
npm run db:migrate      # Gerar/aplicar migrations
npm run db:studio       # Abrir Prisma Studio
npm run db:seed         # Popular com dados iniciais
npm run db:reset        # ⚠️ Zerar tudo + remigrar + reseed
```

## 🔗 Usando no Código

### Imports
```typescript
// No seu service/controller
import { leadsRepository } from '../repositories/leads.repository'
import { pipelineRepository } from '../repositories/pipeline.repository'
import { atividadeRepository } from '../repositories/atividade.repository'
```

### Exemplos

```typescript
// Criar lead
const newLead = await leadsRepository.create({
  nome: 'João Silva',
  email: 'joao@example.com',
  origem: 'whatsapp'
})

// Listar com filtros
const leads = await leadsRepository.findAll({
  status: 'novo',
  skip: 0,
  take: 10
})

// Mover para etapa
await leadsRepository.moveToEtapa(leadId, etapaId)

// Adicionar tag
await leadsRepository.addTag(leadId, tagId)
```

## 📍 Arquivo do Banco

```
leadflow.db  ← SQLite local (auto-criado)
```

Copie/delete/substitua como um arquivo normal. Perfeito para desenvolvimento!

## ✅ Rotas de API Criadas

Todas em `api/leads`:

- `GET /api/leads` - Listar com paginação + filtros (status, origem)
- `GET /api/leads/:id` - Detalhes com atividades
- `POST /api/leads` - Criar (com validação Zod)
- `PUT /api/leads/:id` - Atualizar
- `DELETE /api/leads/:id` - Deletar
- `PATCH /api/leads/:id/etapa` - Mover para etapa

Todas retornam JSON padronizado: `{ data, error, meta }`

## 🐛 Troubleshooting

### Erro: "SQLITE_CANTOPEN"
→ Certifique-se que `.env` tem `DATABASE_URL="file:./leadflow.db"`

### Migrations conflitantes
```bash
npm run db:reset --force  # Nuclear option
```

### Prisma Client desatualizado
```bash
npx prisma generate
```

## 📚 Referências

- [Prisma Docs](https://www.prisma.io/docs/)
- [SQLite](https://www.sqlite.org/)
- [Prisma Studio](https://www.prisma.io/studio)

---

**Criado**: 3 de maio de 2026
**Status**: ✅ Pronto para produção local!
