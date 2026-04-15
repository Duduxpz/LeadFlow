# LeadFlow - Plataforma SaaS de Gestão de Leads

"Transforme conversas em clientes."

LeadFlow é uma plataforma SaaS projetada para capturar leads de múltiplos canais (WhatsApp, Instagram, Webhooks, etc.), centralizá-los em um único painel e classificá-los automaticamente usando inteligência artificial (NLP).

## 🚀 Tecnologias

- **Backend:** Node.js + NestJS + Prisma
- **Frontend:** React + Next.js + Tailwind CSS
- **Banco de Dados:** PostgreSQL (Multi-tenant)
- **Autenticação:** JWT com suporte a multi-empresas

## 📦 Estrutura do Projeto

O projeto é um monorepo utilizando npm workspaces:

- `apps/backend`: API NestJS com Prisma.
- `apps/frontend`: Aplicação Next.js com Dashboard.

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 18+
- Instância do PostgreSQL rodando

### Passo 1: Instalar dependências
```bash
npm install
```

### Passo 2: Configurar Variáveis de Ambiente
Crie um arquivo `.env` em `apps/backend`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/leadflow?schema=public"
JWT_SECRET="sua-chave-secreta"
PORT=3000
```

### Passo 3: Rodar Migrations do Prisma
```bash
cd apps/backend
npx prisma generate
npx prisma db push
```

### Passo 4: Executar o Projeto
No diretório raiz:

Rodar Backend:
```bash
npm run dev:backend
```

Rodar Frontend:
```bash
npm run dev:frontend
```

## ✨ Funcionalidades do MVP

- [x] Cadastro de Empresa e Usuário Admin
- [x] Autenticação JWT
- [x] Captura de Leads via Webhook Universal
- [x] Dashboard com Métricas de Conversão
- [x] Motor de Classificação NLP (Keywords-based MVP)
- [x] Tags Automáticas: "Interessado", "Curioso", "Orçamento", "Fechamento"
- [x] Listagem detalhada de Leads por Tenant
# LeadFlow
