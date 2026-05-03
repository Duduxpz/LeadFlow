# ✅ LeadFlow - Database Refactoring Complete!

## 🎯 Status: 100% Completo

Toda a camada de banco de dados foi **recriada do zero** com SQLite + Prisma ORM!

---

## 📁 Estrutura de Pastas Criada

```
apps/backend/
│
├── 📄 DATABASE_SETUP.md ........................ Guia completo de setup
│
├── prisma/
│   ├── 📋 schema.prisma ........................ ✅ Schema completo com todos os models
│   └── 🌱 seed.ts ............................. ✅ Script de seeding (3 users, 2 pipelines, 20 leads, etc)
│
├── src/
│   ├── lib/
│   │   └── 📄 db.ts ........................... ✅ PrismaClient singleton
│   │
│   ├── repositories/
│   │   ├── 📄 leads.repository.ts ............ ✅ CRUD + busca + paginação para leads
│   │   ├── 📄 pipeline.repository.ts ........ ✅ CRUD para pipelines e etapas
│   │   └── 📄 atividade.repository.ts ....... ✅ CRUD para atividades
│   │
│   └── leads/
│       ├── 📄 leads.controller.ts ........... ✅ 6 rotas de API + validações Zod
│       └── 📄 leads.service.ts .............. ✅ Serviço que usa repositories
│
├── .env ....................................... ✅ DATABASE_URL="file:./leadflow.db"
├── .env.example ............................... ✅ Atualizado
├── .gitignore ................................. ✅ leadflow.db adicionado
└── package.json ............................... ✅ Scripts de DB adicionados

```

---

## 🗄️ Database Models

### 7 Models Principais:

1. **Lead** - Contatos e prospects
   - id, nome, email, telefone, empresa
   - status, score, origem
   - criadoEm, atualizadoEm

2. **Pipeline** - Funis de vendas/suporte
   - id, nome, descricao

3. **Etapa** - Estágios dentro de pipelines
   - id, nome, ordem, cor, pipelineId

4. **LeadEtapa** (M2M) - Lead em qual etapa
   - leadId, etapaId, movidoEm

5. **Usuario** - Usuários do sistema
   - id, nome, email, senha (hash), role, ativo

6. **Atividade** - Ações sobre leads
   - id, tipo, descricao, leadId, usuarioId, criadaEm

7. **Tag & LeadTag** - Categorias para leads
   - Tag: id, nome, cor
   - LeadTag: leadId, tagId

---

## 🚀 Como Executar

### 1️⃣ **Criar/Migrar Banco**
```bash
cd apps/backend
npm run db:migrate
```
Cria `leadflow.db` e aplica todas as migrations.

### 2️⃣ **Popular com Dados**
```bash
npm run db:seed
```
✅ 3 usuários
✅ 2 pipelines
✅ 10 etapas
✅ 20 leads
✅ 5 tags
✅ Atividades de exemplo

### 3️⃣ **Visualizar Dados**
```bash
npm run db:studio
```
Abre Prisma Studio em `http://localhost:5555` 🎨

### 4️⃣ **Resetar Banco** (se necessário)
```bash
npm run db:reset --force
```
Deleta tudo, remigra e reseed.

---

## 🔗 APIs de Leads Criadas

Baseado em padrão JSON padronizado: `{ data, error, meta }`

| Método | Rota | Descrição |
|--------|------|-----------|
| **GET** | `/api/leads` | Listar com paginação + filtros (status, origem) |
| **GET** | `/api/leads/:id` | Detalhes do lead + atividades |
| **POST** | `/api/leads` | Criar novo lead (validação Zod) |
| **PUT** | `/api/leads/:id` | Atualizar lead |
| **DELETE** | `/api/leads/:id` | Deletar lead |
| **PATCH** | `/api/leads/:id/etapa` | Mover para outra etapa |

**Exemplo de uso:**
```typescript
// Criar lead
POST /api/leads
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "telefone": "(11) 98765-4321",
  "empresa": "Acme Corp",
  "origem": "whatsapp"
}

// Mover para etapa
PATCH /api/leads/:id/etapa
{
  "etapaId": "uuid-da-etapa"
}

// Listar com filtros
GET /api/leads?status=novo&origem=google&page=1&limit=10
```

---

## 📊 Dados de Exemplo (Seed)

### Usuários
- **admin@leadflow.com** (admin)
- **joao@leadflow.com** (gerente)
- **maria@leadflow.com** (usuário)
Todos com senha: `senha123`

### Pipelines
1. **Pipeline de Vendas** - 5 etapas (Lead Novo → Fechado)
2. **Pipeline de Suporte** - 5 etapas (Aberto → Resolvido)

### Leads
20 leads fictícios (Acme Corp, Tech Solutions, Global Industries, etc)
com status variados e scores aleatórios.

---

## 💻 Usando nos Serviços

```typescript
import { leadsRepository } from '../repositories/leads.repository'

// Criar
const lead = await leadsRepository.create({
  nome: 'João',
  email: 'joao@example.com',
  origem: 'whatsapp'
})

// Listar com paginação
const result = await leadsRepository.findAll({
  status: 'novo',
  skip: 0,
  take: 10
})

// Buscar por ID
const lead = await leadsRepository.findById(leadId)

// Mover para etapa
await leadsRepository.moveToEtapa(leadId, etapaId)

// Adicionar tag
await leadsRepository.addTag(leadId, tagId)
```

---

## 🔧 Configuração

### .env
```
DATABASE_URL="file:./leadflow.db"
JWT_SECRET="leadflow-secret-key-change-this-in-production"
PORT=3333
```

### Scripts de DB
```json
{
  "db:migrate": "prisma migrate dev",
  "db:studio": "prisma studio",
  "db:seed": "ts-node prisma/seed.ts",
  "db:reset": "prisma migrate reset --force"
}
```

---

## ✨ Destaques

✅ **SQLite** - Zero dependências de servidor
✅ **Prisma** - Type-safe queries + migrations automáticas
✅ **Repositories** - Padrão de dados clean
✅ **Validação** - Zod schemas em todas as rotas
✅ **Paginação** - Implementada com meta informações
✅ **Seed** - Dados realistas para development
✅ **Documentação** - Guia completo em DATABASE_SETUP.md

---

## 📝 Próximos Passos (Opcional)

- [ ] Testar as rotas de API com Postman/Insomnia
- [ ] Adicionar mais repositórios (Tag, Pipeline, Usuario)
- [ ] Criar DTOs tipados com Zod
- [ ] Adicionar paginação em outras rotas
- [ ] Implementar cache com Redis (se necessário)
- [ ] Adicionar testes E2E

---

**🎉 Refactoring Concluído!**

Seu banco SQLite + Prisma está pronto para ir à produção local! 🚀
