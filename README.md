# API GymPass Style

API em Node.js/TypeScript que implementa um fluxo inspirado no GymPass. O servidor usa Fastify, Prisma e PostgreSQL para gerenciar usuários, academias e check-ins, seguindo boas práticas SOLID.

## Tecnologias principais

- Node.js 20+, TypeScript e módulo ES
- Fastify para HTTP e validações com Zod
- Prisma ORM + PostgreSQL (container Bitnami)
- Docker Compose para infraestrutura local
- Vitest para testes unitários e de casos de uso

## Pré-requisitos

- Node.js 20 (ou superior) e npm
- Docker + Docker Compose (para subir o PostgreSQL local)
- Acesso ao Prisma CLI (`npx prisma ...`)

## Variáveis de ambiente

Crie um arquivo `.env` a partir do exemplo abaixo.

| Variável | Descrição | Exemplo |
| --- | --- | --- |
| `NODE_ENV` | Ambiente ativo (`dev`, `test`, `production`) | `dev` |
| `PORT` | Porta HTTP exposta pelo Fastify | `3333` |
| `DATABASE_URL` | URL de conexão PostgreSQL usada pelo Prisma | `postgresql://docker:docker@localhost:5432/apisolid?schema=public` |

```bash
cp .env.example .env
# preencha PORT e DATABASE_URL se necessário
```

## Setup e execução local

1. **Instale dependências**
   ```bash
   npm install
   ```
2. **Suba o PostgreSQL local**
   ```bash
   docker compose up -d api-solid-pg
   ```
3. **Atualize o banco com as migrações Prisma**
   ```bash
   npx prisma migrate dev
   ```
4. **Rode em modo desenvolvimento com hot reload**
   ```bash
   npm run dev
   ```
   A API iniciará em `http://localhost:<PORT>` (padrão `3333`).

## Scripts úteis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Sobe o Fastify com TSX e hot reload |
| `npm run test` | Executa a suíte de testes com Vitest |
| `npm run test:watch` | Executa tests em modo observação |
| `npm run build` | Transpila a API para `build/` usando tsup |
| `npm start` | Executa a versão compilada (`build/server.cjs`) |

## Fluxos adicionais

- **Produção**: defina `DATABASE_URL` para o banco real, rode `npm run build`, aplique `npx prisma migrate deploy` e inicie com `npm start`.
- **Prisma Studio** (opcional): `npx prisma studio` abre um painel para inspecionar dados.
- **Reset do banco local**: derrube o container (`docker compose down -v`) e repita a etapa de migração.

## Escopo funcional

### Requisitos funcionais (RF)

- [ ] Cadastro e autenticação de usuários
- [ ] Consulta de perfil, histórico e total de check-ins
- [ ] Busca de academias por proximidade ou nome
- [ ] Registro e validação de check-ins
- [ ] Cadastro de academias

### Regras de negócio (RN)

- [ ] E-mail único por usuário
- [ ] Máximo de um check-in por dia
- [ ] Check-in apenas se o usuário estiver a até 100 m da academia
- [ ] Validação de check-in disponível após 20 minutos
- [ ] Apenas administradores validam check-ins e criam academias

### Requisitos não funcionais (RNF)

- [ ] Hash de senhas
- [ ] Persistência em PostgreSQL
- [ ] Paginação de listas em blocos de 20 itens
- [ ] Identificação via JWT

Com esses passos o projeto fica pronto para desenvolvimento, execução e testes locais.
