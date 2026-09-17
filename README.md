# 💰 Dashboard de Gastos — API Backend

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Prisma-7.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Zod-Validation-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
</p>

API RESTful completa desenvolvida em **Node.js** e **TypeScript** para gerenciamento de finanças pessoais e controle de despesas. A aplicação permite controle de fluxo financeiro (receitas e despesas), categorização personalizada, múltiplos métodos de pagamento, controle de status de liquidação e autenticação segura baseada em JWT.

---

## 📌 Funcionalidades

### 🔐 Autenticação & Usuários
- Cadastro de novos usuários com validação de dados via Zod.
- Criptografia segura de senhas com `bcryptjs`.
- Autenticação e geração de token **JWT**.
- Middleware de proteção de rotas (`isAuthenticated`).
- Rota para consulta do perfil do usuário autenticado.

### 🏷️ Categorias
- Criação de categorias vinculadas ao usuário logado.
- Suporte a atribuição de cor hexadecimal (`color`) para representação visual no frontend.
- Restrição de unicidade por usuário (não permite categorias com nomes duplicados para a mesma conta).
- Edição, listagem e exclusão de categorias.

### 💳 Transações Financeiras
- Registro de transações do tipo Receita (`INCOME`) ou Despesa (`EXPENSE`).
- Valores armazenados em formato inteiro (ex: centavos, evitando imprecisões de ponto flutuante).
- Métodos de pagamento suportados:
  - `PIX`, `CASH`, `DEBIT_CARD`, `CREDIT_CARD`, `BANK_TRANSFER`, `BOLETO`, `OTHER`.
- Status da transação:
  - `PENDING` (Pendente), `PAID` (Pago/Recebido), `OVERDUE` (Atrasado).
- Vínculo direto a uma categoria e ao usuário autenticado.
- Filtros avançados na listagem de transações:
  - Por tipo (`INCOME` / `EXPENSE`).
  - Por status (`PENDING` / `PAID` / `OVERDUE`).
  - Por categoria (`categoryId`).
  - Por intervalo de datas (`startDate` e `endDate`).
- Atualização e exclusão de transações.

---

## 🛠️ Tecnologias Utilizadas

- **Runtime & Linguagem**: [Node.js](https://nodejs.org/) (ES Modules) com [TypeScript](https://www.typescriptlang.org/)
- **Servidor HTTP**: [Express 5](https://expressjs.com/)
- **ORM**: [Prisma 7](https://www.prisma.io/) com driver adapter PostgreSQL (`@prisma/adapter-pg`)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/) (hospedado no Neon DB)
- **Validação de Schemas**: [Zod](https://zod.dev/)
- **Segurança & Criptografia**: [bcryptjs](https://github.com/dcodeIO/bcrypt.js) e [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- **Hot-Reload em Desenvolvimento**: [tsx](https://github.com/privatenumber/tsx)

---

## 📂 Estrutura do Projeto

```text
backend/
├── prisma/
│   └── schema.prisma              # Definição do modelo de dados e enums
├── src/
│   ├── @types/                    # Tipagens e declarações globais (Express Request)
│   ├── controllers/               # Controladores HTTP das rotas
│   │   ├── category/              # Controladores de categorias
│   │   ├── transaction/           # Controladores de transações
│   │   └── user/                  # Controladores de usuários e autenticação
│   ├── lib/                       # Instâncias e adaptadores de conexão (Prisma Client)
│   ├── middlewares/               # Middlewares (Auth, Validação Zod, AppError)
│   ├── routes/                    # Definição dos endpoints Express
│   ├── schemas/                   # Schemas de validação Zod
│   ├── services/                  # Regras de negócio da aplicação
│   ├── types/                     # Interfaces e DTOs em TypeScript
│   └── server.ts                  # Ponto de entrada do servidor
├── .env.example                   # Exemplo de variáveis de ambiente
├── package.json                   # Dependências e scripts
└── tsconfig.json                  # Configurações do compilador TypeScript
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** (versão 20 ou superior recomendada)
- Gerenciador de pacotes **npm**
- Instância do **PostgreSQL** (local ou em nuvem como Neon, Supabase, etc.)

### 1. Clonar o repositório
```bash
git clone https://github.com/pcidro/dashboardgastos.git
cd dashboardgastos/backend
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configurar as variáveis de ambiente
Crie um arquivo `.env` na raiz da pasta `backend` baseando-se no `.env.example`:

```bash
cp .env.example .env
```

Preencha com suas credenciais:
```env
DATABASE_URL="postgresql://seu_usuario:sua_senha@host:5432/seu_banco?sslmode=require"
JWT_SECRET="sua_chave_secreta_jwt_longa_e_segura"
```

### 4. Executar migrações do banco de dados
Gere os tipos do Prisma e aplique o schema no banco:
```bash
npx prisma generate
npx prisma db push
# ou para migrações versionadas:
npx prisma migrate dev
```

### 5. Iniciar o servidor

**Modo de Desenvolvimento** (com auto-reload):
```bash
npm run dev
```

O servidor iniciará em: `http://localhost:3333`

**Modo de Produção**:
```bash
npm run build
npm start
```

---

## 📖 Documentação da API

Base URL padrão: `http://localhost:3333/api`

> ℹ️ **Autenticação**: Rotas protegidas exigem o cabeçalho HTTP:
> `Authorization: Bearer <seu_token_jwt>`

### 1. Usuários e Autenticação

#### `POST /api/user` — Criar Usuário
Cria uma nova conta de usuário.
- **Autenticação**: Pública
- **Body**:
```json
{
  "name": "Paulo Cidro",
  "email": "paulo@email.com",
  "password": "senhaSegura123"
}
```
- **Resposta (201/200)**:
```json
{
  "id": "uuid-do-usuario",
  "name": "Paulo Cidro",
  "email": "paulo@email.com"
}
```

#### `POST /api/login` — Autenticar Usuário
Realiza login e retorna o token de acesso JWT.
- **Autenticação**: Pública
- **Body**:
```json
{
  "email": "paulo@email.com",
  "password": "senhaSegura123"
}
```
- **Resposta (200)**:
```json
{
  "id": "uuid-do-usuario",
  "name": "Paulo Cidro",
  "email": "paulo@email.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

#### `GET /api/me` — Detalhes do Usuário Logado
Retorna os dados do usuário autenticado no token.
- **Autenticação**: `Bearer Token`
- **Resposta (200)**:
```json
{
  "id": "uuid-do-usuario",
  "name": "Paulo Cidro",
  "email": "paulo@email.com",
  "createdAt": "2026-09-16T12:00:00.000Z"
}
```

---

### 2. Categorias

#### `POST /api/categories` — Criar Categoria
- **Autenticação**: `Bearer Token`
- **Body**:
```json
{
  "name": "Alimentação",
  "color": "#FF5733"
}
```

#### `GET /api/categories` — Listar Categorias
Retorna todas as categorias do usuário autenticado.
- **Autenticação**: `Bearer Token`
- **Resposta (200)**:
```json
[
  {
    "id": "uuid-categoria-1",
    "name": "Alimentação",
    "color": "#FF5733",
    "userId": "uuid-usuario",
    "createdAt": "2026-09-16T12:00:00.000Z"
  }
]
```

#### `PUT /api/categories/:id` — Atualizar Categoria
- **Autenticação**: `Bearer Token`
- **Body**:
```json
{
  "name": "Alimentação e Mercado",
  "color": "#E74C3C"
}
```

#### `DELETE /api/categories/:id` — Deletar Categoria
Remove uma categoria existente pertencente ao usuário autenticado.
- **Autenticação**: `Bearer Token`

---

### 3. Transações

#### `POST /api/transaction` — Criar Transação
Registra uma nova receita ou despesa.
- **Autenticação**: `Bearer Token`
- **Body**:
```json
{
  "description": "Salário Mensal",
  "amount": 500000,
  "date": "2026-09-16T00:00:00.000Z",
  "type": "INCOME",
  "status": "PAID",
  "paymentMethod": "PIX",
  "notes": "Pagamento adiantado",
  "categoryId": "uuid-da-categoria"
}
```

> **Nota sobre `amount`**: Armazene os valores como números inteiros (centavos). Por exemplo, `R$ 50,00` deve ser enviado como `5000`.

#### `GET /api/transactions` ou `GET /api/transaction` — Listar / Filtrar Transações
Retorna as transações do usuário logado, com filtros opcionais via Query Params.
- **Autenticação**: `Bearer Token`
- **Query Params (Opcionais)**:
  - `type`: `INCOME` ou `EXPENSE`
  - `status`: `PENDING`, `PAID` ou `OVERDUE`
  - `categoryId`: UUID da categoria
  - `startDate`: Data inicial (formato ISO 8601, ex: `2026-09-01`)
  - `endDate`: Data final (formato ISO 8601, ex: `2026-09-30`)

**Exemplo de requisição**:
```
GET /api/transactions?type=EXPENSE&status=PAID&startDate=2026-09-01&endDate=2026-09-30
```

#### `PUT /api/transaction/:id` — Editar Transação
Atualiza dados de uma transação existente.
- **Autenticação**: `Bearer Token`
- **Body**: Campos que deseja atualizar (`description`, `amount`, `date`, `type`, `status`, `paymentMethod`, `notes`, `categoryId`).

#### `DELETE /api/transaction/:id` — Deletar Transação
Exclui uma transação do usuário autenticado.
- **Autenticação**: `Bearer Token`

---

## 🗄️ Modelagem do Banco de Dados

```mermaid
erDiagram
    User ||--o{ Category : "possui"
    User ||--o{ Transaction : "realiza"
    Category ||--o{ Transaction : "classifica"

    User {
        String id PK
        String email UK
        String name
        String passwordHash
        DateTime createdAt
        DateTime updatedAt
    }

    Category {
        String id PK
        String name
        String color
        String userId FK
        DateTime createdAt
        DateTime updatedAt
    }

    Transaction {
        String id PK
        String description
        Int amount
        DateTime date
        TransactionType type
        TransactionStatus status
        PaymentMethod paymentMethod
        String notes
        String userId FK
        String categoryId FK
        DateTime createdAt
        DateTime updatedAt
    }
```

---



