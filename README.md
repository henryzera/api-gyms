# API SOLID Node.js

API de uma aplicação estilo GymPass, desenvolvida com Node.js, TypeScript, Fastify e Prisma, aplicando princípios SOLID.

## Funcionalidades

- Usuários: cadastro, autenticação e perfil.
- Academias: cadastro e busca por nome/proximidade.
- Check-ins: registro e validações de regras de negócio.

## Tecnologias

- Node.js
- TypeScript
- Fastify
- Prisma
- Zod
- Vitest
- Docker
- TSX
- TSUP

## Requisitos

### RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar.
- [x] Deve ser possível se autenticar.
- [ ] Deve ser possível obter o perfil de um usuário logado.
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado.
- [ ] Deve ser possível o usuário obter o seu histórico de check-ins.
- [ ] Deve ser possível o usuário buscar academias próximas (até 10km).
- [ ] Deve ser possível o usuário buscar academias pelo nome.
- [x] Deve ser possível o usuário realizar check-in em uma academia.
- [ ] Deve ser possível validar o check-in de um usuário.
- [ ] Deve ser possível cadastrar uma academia.

### RNs (Regras de Negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado.
- [x] O usuário não pode fazer 2 check-ins no mesmo dia.
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia.
- [ ] O check-in só pode ser validado até 20 minutos após ser criado.
- [ ] O check-in só pode ser validado por administradores.
- [ ] A academia só pode ser cadastrada por administradores.

### RNFs (Requisitos Não Funcionais)

- [x] A senha do usuário precisa estar criptografada.
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL.
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página.
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token).
