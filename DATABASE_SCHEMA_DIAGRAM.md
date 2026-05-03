# 🗄️ LeadFlow - Database Schema Diagram

## Visual da Estrutura

```
┌─────────────────────────────────────────────────────────────────┐
│                    LEADFLOW DATABASE SCHEMA                      │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│    USUARIO           │
├──────────────────────┤
│ PK: id               │
│ nome                 │
│ email (UNIQUE)       │
│ senha                │
│ role: admin|gerente  │
│ ativo: boolean       │
│ criadoEm: timestamp  │
└──────────────────────┘
         │
         │ 1:N (usuarioId)
         │
         ▼
┌──────────────────────┐
│    ATIVIDADE         │
├──────────────────────┤
│ PK: id               │
│ tipo                 │ ◄─── chamada, email,
│ descricao            │      reuniao, nota, sms
│ leadId (FK)          │───┐
│ usuarioId (FK)       │   │
│ criadaEm: timestamp  │   │
└──────────────────────┘   │
                           │
                           │ 1:N
                           ▼
┌──────────────────────┐  ┌──────────────────────┐
│    LEAD              │  │      PIPELINE        │
├──────────────────────┤  ├──────────────────────┤
│ PK: id               │  │ PK: id               │
│ nome                 │  │ nome (UNIQUE)        │
│ email                │  │ descricao            │
│ telefone             │  │ criadoEm: timestamp  │
│ empresa              │  └──────────────────────┘
│ status: string       │           │
│ score: 0-100         │           │ 1:N
│ origem               │           ▼
│ criadoEm: timestamp  │  ┌──────────────────────┐
│ atualizadoEm: timestamp
└──────────────────────┘  │      ETAPA           │
         │                ├──────────────────────┤
         │                │ PK: id               │
         │ M:N            │ nome                 │
         │                │ ordem: int           │
         │ leadId_etapaId │ cor: string          │
         │                │ pipelineId (FK)      │
         │                │ criadoEm: timestamp  │
         │                │ @unique(pipelineId, │
         │                │          ordem)      │
         │                └──────────────────────┘
         │                       ▲
         │ M:N                   │
         └──────►┌──────────────────────┐
                 │   LEAD_ETAPA        │
                 ├──────────────────────┤
                 │ PK: id               │
                 │ leadId (FK)          │
                 │ etapaId (FK)         │
                 │ movidoEm: timestamp  │
                 │ @unique(leadId,      │
                 │          etapaId)    │
                 └──────────────────────┘


         M:N
    ┌────────────────────────────┐
    │                            │
    ▼                            ▼
┌──────────────────┐    ┌──────────────────┐
│     LEAD_TAG     │    │       TAG        │
├──────────────────┤    ├──────────────────┤
│ PK: id           │    │ PK: id           │
│ leadId (FK)      │    │ nome (UNIQUE)    │
│ tagId (FK)       │    │ cor: string      │
│ @unique(leadId,  │    │                  │
│          tagId)  │    └──────────────────┘
└──────────────────┘
```

---

## 📊 Relacionamentos

### 1️⃣ Lead → Pipeline (Indiretamente via Etapa)
```
Lead ──M:N──> Etapa ──N:1──> Pipeline
```
Um lead pode estar em múltiplas etapas (histórico).
Múltiplos leads podem estar na mesma etapa.

### 2️⃣ Lead → Atividade (1:N)
```
Lead ──1:N──> Atividade
```
Um lead tem múltiplas atividades.

### 3️⃣ Lead → Tag (M:N)
```
Lead ──M:N──> Tag
```
Um lead pode ter múltiplas tags.
Uma tag pode ser usada em múltiplos leads.

### 4️⃣ Atividade → Usuario (N:1)
```
Atividade ──N:1──> Usuario
```
Uma atividade foi criada por um usuário.

### 5️⃣ Etapa → Pipeline (N:1)
```
Etapa ──N:1──> Pipeline
```
Múltiplas etapas pertencem a um pipeline.

---

## 🔑 Indexes

Para melhor performance:

```sql
-- Lead Indexes
CREATE INDEX idx_lead_status ON Lead(status);
CREATE INDEX idx_lead_origem ON Lead(origem);
CREATE INDEX idx_lead_criadoEm ON Lead(criadoEm);

-- LeadEtapa Indexes
CREATE INDEX idx_lead_etapa_leadId ON LeadEtapa(leadId);
CREATE INDEX idx_lead_etapa_etapaId ON LeadEtapa(etapaId);

-- Atividade Indexes
CREATE INDEX idx_atividade_leadId ON Atividade(leadId);
CREATE INDEX idx_atividade_usuarioId ON Atividade(usuarioId);
CREATE INDEX idx_atividade_criadaEm ON Atividade(criadaEm);

-- Etapa Indexes
CREATE INDEX idx_etapa_pipelineId ON Etapa(pipelineId);

-- LeadTag Indexes
CREATE INDEX idx_lead_tag_leadId ON LeadTag(leadId);
CREATE INDEX idx_lead_tag_tagId ON LeadTag(tagId);
```

---

## 💾 Exemplo de Dados

```sql
-- Usuários
INSERT INTO Usuario VALUES (
  'uuid-1', 'João Silva', 'joao@leadflow.com', 'hashed_password', 'gerente', true, NOW()
);

-- Pipeline
INSERT INTO Pipeline VALUES (
  'uuid-p1', 'Pipeline de Vendas', 'Gerenciar prospects', NOW()
);

-- Etapas
INSERT INTO Etapa VALUES (
  'uuid-e1', 'Lead Novo', 1, '#E5E7EB', 'uuid-p1', NOW()
);

-- Lead
INSERT INTO Lead VALUES (
  'uuid-l1', 'Acme Corp', 'contact@acme.com', '(11) 98765-4321', 'Acme Corporation',
  'novo', 85, 'whatsapp', NOW(), NOW()
);

-- Lead em Etapa
INSERT INTO LeadEtapa VALUES (
  'uuid-le1', 'uuid-l1', 'uuid-e1', NOW()
);

-- Tag
INSERT INTO Tag VALUES (
  'uuid-t1', 'Interessado', '#10B981'
);

-- Lead com Tag
INSERT INTO LeadTag VALUES (
  'uuid-lt1', 'uuid-l1', 'uuid-t1'
);

-- Atividade
INSERT INTO Atividade VALUES (
  'uuid-a1', 'chamada', 'Primeiro contato realizado', 'uuid-l1', 'uuid-1', NOW()
);
```

---

## 🔍 Queries Comuns

```sql
-- Todos os leads com suas etapas
SELECT l.*, le.etapaId
FROM Lead l
LEFT JOIN LeadEtapa le ON l.id = le.leadId
WHERE l.status = 'novo';

-- Leads de um pipeline específico
SELECT l.*, e.nome as etapa_nome
FROM Lead l
LEFT JOIN LeadEtapa le ON l.id = le.leadId
LEFT JOIN Etapa e ON le.etapaId = e.id
WHERE e.pipelineId = 'uuid-p1'
ORDER BY l.criadoEm DESC;

-- Atividades de um lead
SELECT a.*, u.nome as usuario_nome
FROM Atividade a
JOIN Usuario u ON a.usuarioId = u.id
WHERE a.leadId = 'uuid-l1'
ORDER BY a.criadaEm DESC;

-- Tags de um lead
SELECT t.*
FROM Tag t
JOIN LeadTag lt ON t.id = lt.tagId
WHERE lt.leadId = 'uuid-l1';

-- Leads com estatísticas
SELECT 
  l.id,
  l.nome,
  l.status,
  COUNT(DISTINCT le.id) as etapa_count,
  COUNT(DISTINCT a.id) as atividade_count,
  COUNT(DISTINCT lt.id) as tag_count
FROM Lead l
LEFT JOIN LeadEtapa le ON l.id = le.leadId
LEFT JOIN Atividade a ON l.id = a.leadId
LEFT JOIN LeadTag lt ON l.id = lt.leadId
GROUP BY l.id
ORDER BY l.criadoEm DESC;
```

---

## 📈 Escalabilidade

Para crescimento futuro:

```
Leads       ~ 1M+  (indexado por status, origem, criadoEm)
Atividades  ~ 5M+  (indexado por leadId, usuarioId)
Usuarios    ~ 1K   (pequeno, sem problema)
Pipelines   ~ 10   (fixo)
Etapas      ~ 100  (fixo)
Tags        ~ 1K   (crescimento lento)
```

**SQLite é adequado para** até ~10GB de dados (~100M+ registros).

Quando crescer além disso, migre para PostgreSQL sem mudar código (Prisma suporta ambos).

---

## 🚀 Otimizações (Futuras)

- [ ] Cache com Redis para leads frequentes
- [ ] Full-text search em descrições de atividades
- [ ] Particionamento de atividades por data
- [ ] Replicação master-slave para backup
- [ ] Analytics com Elasticsearch

---

**Estrutura pronta para crescer! 🎉**
