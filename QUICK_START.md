# 🚀 LeadFlow - Quick Start Guide

## ⚡ 5 Minutos para Rodar Tudo

### 📍 Pré-requisitos
- Node.js 18+ instalado
- npm instalado

---

## 🎯 Passo a Passo

### 1️⃣ Instalar Dependências
```bash
cd apps/backend
npm install
```
⏱️ Leva ~2-3 minutos

### 2️⃣ Criar o Banco de Dados
```bash
npm run db:migrate
```
✅ Cria `leadflow.db` local
✅ Aplica todas as migrations

### 3️⃣ Popular com Dados
```bash
npm run db:seed
```
✅ 3 usuários
✅ 2 pipelines
✅ 20 leads
✅ Tudo pronto para testar!

### 4️⃣ Iniciar o Servidor
```bash
npm run start:dev
```
Servidor rodando em `http://localhost:3333`

### 5️⃣ (OPCIONAL) Ver os Dados
```bash
npm run db:studio
```
Abre Prisma Studio em `http://localhost:5555` 🎨

---

## ✅ Tudo Pronto!

Agora você pode:

### 📡 Testar as APIs
```bash
# Terminal novo
curl http://localhost:3333/api/leads
```

### 📋 Ver a Documentação
- 📚 [DATABASE_SETUP.md](./apps/backend/DATABASE_SETUP.md) - Guia completo
- 📝 [API_REQUESTS_EXAMPLES.md](./API_REQUESTS_EXAMPLES.md) - Exemplos de requisições
- 📊 [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) - Resumo do que foi feito

---

## 📁 Arquivos Criados/Modificados

```
✅ prisma/schema.prisma              - Schema completo com SQLite
✅ prisma/seed.ts                    - 20 leads + dados iniciais
✅ src/lib/db.ts                     - PrismaClient singleton
✅ src/repositories/*.ts             - Repositories (leads, pipeline, atividade)
✅ src/leads/leads.controller.ts     - 6 rotas de API + validações
✅ src/leads/leads.service.ts        - Serviço que usa repositories
✅ .env                              - DATABASE_URL="file:./leadflow.db"
✅ .gitignore                        - leadflow.db ignorado
✅ package.json                      - Scripts de DB
✅ DATABASE_SETUP.md                 - Documentação de setup
✅ API_REQUESTS_EXAMPLES.md          - Exemplos de requisições
✅ REFACTORING_SUMMARY.md            - Resumo do refactoring
```

---

## 🛠️ Scripts Disponíveis

```bash
npm run db:migrate      # Criar/atualizar banco
npm run db:studio       # Abrir Prisma Studio (visual)
npm run db:seed         # Popular banco com dados
npm run db:reset        # Zerar tudo e recomeçar

npm run start:dev       # Rodar servidor (watch mode)
npm run build           # Build para produção
npm run start:prod      # Rodar build de produção
npm run lint            # Rodar linter
npm run test            # Rodar testes
```

---

## 📊 Endpoints de API

| Verbo | URL | Descrição |
|-------|-----|-----------|
| GET | `/api/leads` | Listar (com paginação) |
| GET | `/api/leads/:id` | Detalhe |
| POST | `/api/leads` | Criar |
| PUT | `/api/leads/:id` | Atualizar |
| DELETE | `/api/leads/:id` | Deletar |
| PATCH | `/api/leads/:id/etapa` | Mover para etapa |

---

## 🐛 Troubleshooting

### "Erro: No database found"
```bash
npm run db:migrate
```

### "Erro: Module not found"
```bash
npm install
npx prisma generate
```

### "Porta 3333 já em uso"
```bash
# Mude a porta em .env
PORT=3334
```

### "Banco não tem dados"
```bash
npm run db:seed
```

---

## 📞 Suporte

Para mais detalhes, veja:
- [DATABASE_SETUP.md](./apps/backend/DATABASE_SETUP.md) - Setup completo
- [API_REQUESTS_EXAMPLES.md](./API_REQUESTS_EXAMPLES.md) - Como testar APIs

---

## 🎉 Sucesso!

Seu LeadFlow está pronto! 🚀

**Próximo passo:** Abra Postman/Insomnia e teste as rotas!

```bash
npm run start:dev
```

Depois em outro terminal:
```bash
curl http://localhost:3333/api/leads
```

👉 Veja respostas em [API_REQUESTS_EXAMPLES.md](./API_REQUESTS_EXAMPLES.md)
