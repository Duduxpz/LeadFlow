# API Requests Examples - LeadFlow

## Base URL
```
http://localhost:3333
```

## 📋 Collection de Requisições

### 1️⃣ Listar Leads (COM PAGINAÇÃO E FILTROS)
```http
GET http://localhost:3333/api/leads?page=1&limit=10&status=novo&origem=whatsapp

# Response: 200 OK
{
  "data": [
    {
      "id": "uuid-1",
      "nome": "Acme Corporation",
      "email": "contact@acme.com",
      "telefone": "(11) 98765-4321",
      "empresa": "Acme Corp",
      "status": "novo",
      "score": 85,
      "origem": "formulario",
      "criadoEm": "2026-05-03T10:00:00Z",
      "atualizadoEm": "2026-05-03T10:00:00Z",
      "etapas": [],
      "atividades": [],
      "tags": []
    }
  ],
  "meta": {
    "total": 5,
    "page": 1,
    "pageSize": 10,
    "totalPages": 1
  },
  "error": null
}
```

### 2️⃣ Buscar Lead por ID (COM ATIVIDADES)
```http
GET http://localhost:3333/api/leads/uuid-1

# Response: 200 OK
{
  "data": {
    "id": "uuid-1",
    "nome": "Acme Corporation",
    "email": "contact@acme.com",
    "telefone": "(11) 98765-4321",
    "empresa": "Acme Corp",
    "status": "novo",
    "score": 85,
    "origem": "formulario",
    "criadoEm": "2026-05-03T10:00:00Z",
    "atualizadoEm": "2026-05-03T10:00:00Z",
    "etapas": [
      {
        "id": "etapa-uuid",
        "leadId": "uuid-1",
        "etapaId": "etapa-uuid",
        "movidoEm": "2026-05-03T10:00:00Z",
        "etapa": {
          "id": "etapa-uuid",
          "nome": "Lead Novo",
          "ordem": 1,
          "cor": "#E5E7EB",
          "pipelineId": "pipeline-uuid",
          "pipeline": {
            "id": "pipeline-uuid",
            "nome": "Pipeline de Vendas"
          }
        }
      }
    ],
    "atividades": [
      {
        "id": "atividade-uuid",
        "tipo": "chamada",
        "descricao": "Primeiro contato realizado",
        "leadId": "uuid-1",
        "usuarioId": "user-uuid",
        "criadaEm": "2026-05-03T11:00:00Z",
        "usuario": {
          "id": "user-uuid",
          "nome": "João Silva",
          "email": "joao@leadflow.com"
        }
      }
    ],
    "tags": [
      {
        "id": "tag-uuid",
        "leadId": "uuid-1",
        "tagId": "tag-uuid",
        "tag": {
          "id": "tag-uuid",
          "nome": "Interessado",
          "cor": "#10B981"
        }
      }
    ]
  },
  "error": null,
  "meta": {
    "timestamp": "2026-05-03T10:00:00Z"
  }
}
```

### 3️⃣ Criar Novo Lead
```http
POST http://localhost:3333/api/leads
Content-Type: application/json

{
  "nome": "Nova Empresa XYZ",
  "email": "contato@xyzcompany.com",
  "telefone": "(21) 99999-8888",
  "empresa": "XYZ Company",
  "status": "novo",
  "score": 75,
  "origem": "google"
}

# Response: 201 Created
{
  "data": {
    "id": "novo-uuid",
    "nome": "Nova Empresa XYZ",
    "email": "contato@xyzcompany.com",
    "telefone": "(21) 99999-8888",
    "empresa": "XYZ Company",
    "status": "novo",
    "score": 75,
    "origem": "google",
    "criadoEm": "2026-05-03T12:00:00Z",
    "atualizadoEm": "2026-05-03T12:00:00Z",
    "etapas": [],
    "atividades": [],
    "tags": []
  },
  "error": null,
  "meta": {
    "timestamp": "2026-05-03T12:00:00Z",
    "created": true
  }
}
```

### 4️⃣ Atualizar Lead
```http
PUT http://localhost:3333/api/leads/uuid-1
Content-Type: application/json

{
  "nome": "Acme Corporation Atualizado",
  "status": "contactado",
  "score": 92,
  "telefone": "(11) 98765-4321"
}

# Response: 200 OK
{
  "data": {
    "id": "uuid-1",
    "nome": "Acme Corporation Atualizado",
    "email": "contact@acme.com",
    "telefone": "(11) 98765-4321",
    "empresa": "Acme Corp",
    "status": "contactado",
    "score": 92,
    "origem": "formulario",
    "criadoEm": "2026-05-03T10:00:00Z",
    "atualizadoEm": "2026-05-03T13:00:00Z",
    "etapas": [],
    "atividades": [],
    "tags": []
  },
  "error": null,
  "meta": {
    "timestamp": "2026-05-03T13:00:00Z",
    "updated": true
  }
}
```

### 5️⃣ Mover Lead para Outra Etapa
```http
PATCH http://localhost:3333/api/leads/uuid-1/etapa
Content-Type: application/json

{
  "etapaId": "etapa-uuid-qualificado"
}

# Response: 200 OK
{
  "data": {
    "id": "lead-etapa-uuid",
    "leadId": "uuid-1",
    "etapaId": "etapa-uuid-qualificado",
    "movidoEm": "2026-05-03T14:00:00Z",
    "lead": {
      "id": "uuid-1",
      "nome": "Acme Corporation",
      "email": "contact@acme.com"
    },
    "etapa": {
      "id": "etapa-uuid-qualificado",
      "nome": "Qualificado",
      "ordem": 3,
      "cor": "#DCFCE7",
      "pipelineId": "pipeline-uuid",
      "pipeline": {
        "id": "pipeline-uuid",
        "nome": "Pipeline de Vendas"
      }
    }
  },
  "error": null,
  "meta": {
    "timestamp": "2026-05-03T14:00:00Z",
    "moved": true
  }
}
```

### 6️⃣ Deletar Lead
```http
DELETE http://localhost:3333/api/leads/uuid-1

# Response: 200 OK
{
  "data": null,
  "error": null,
  "meta": {
    "timestamp": "2026-05-03T15:00:00Z",
    "deleted": true,
    "deletedId": "uuid-1"
  }
}
```

---

## 🔍 Exemplos de Filtros

### Listar leads "novo" e "contactado"
```http
GET http://localhost:3333/api/leads?status=novo
GET http://localhost:3333/api/leads?status=contactado
```

### Listar por origem
```http
GET http://localhost:3333/api/leads?origem=whatsapp
GET http://localhost:3333/api/leads?origem=google
GET http://localhost:3333/api/leads?origem=instagram
```

### Paginação
```http
GET http://localhost:3333/api/leads?page=1&limit=10
GET http://localhost:3333/api/leads?page=2&limit=20
```

### Combinações
```http
GET http://localhost:3333/api/leads?status=novo&origem=whatsapp&page=1&limit=5
```

---

## ❌ Error Responses

### Lead não encontrado (404)
```json
{
  "data": null,
  "error": "Lead não encontrado",
  "meta": null
}
```

### Validação falhou (400)
```json
{
  "data": null,
  "error": "Erro de validação",
  "meta": {
    "validationErrors": [
      {
        "code": "too_small",
        "minimum": 1,
        "type": "string",
        "path": ["nome"],
        "message": "Nome é obrigatório"
      }
    ]
  }
}
```

---

## 📌 Teste com Postman/Insomnia

1. Importe os requests acima
2. Certifique-se que o servidor está rodando: `npm run start:dev`
3. Certifique-se que o banco foi migrado: `npm run db:migrate`
4. Certifique-se que o seed foi executado: `npm run db:seed`
5. Execute as requisições! 🚀

---

## 🧪 cURL Examples

```bash
# Listar leads
curl -X GET "http://localhost:3333/api/leads?page=1&limit=10"

# Criar lead
curl -X POST "http://localhost:3333/api/leads" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Test Company",
    "email": "test@example.com",
    "origem": "whatsapp"
  }'

# Buscar por ID
curl -X GET "http://localhost:3333/api/leads/uuid-1"

# Atualizar
curl -X PUT "http://localhost:3333/api/leads/uuid-1" \
  -H "Content-Type: application/json" \
  -d '{"status": "contactado", "score": 90}'

# Deletar
curl -X DELETE "http://localhost:3333/api/leads/uuid-1"

# Mover para etapa
curl -X PATCH "http://localhost:3333/api/leads/uuid-1/etapa" \
  -H "Content-Type: application/json" \
  -d '{"etapaId": "etapa-uuid"}'
```

---

**Sucesso! Suas APIs estão prontas para serem testadas! 🎉**
