### 🌐 PT-BR
#### [EN-US](https://github.com/ArthurFakhouri/NLW-Pocket/blob/main/server/READMEENUS.md)

<h1 align="center">
    <img alt="NLW Pocket logo" title="#NLW-Pocket-logo" src="../.github/logo.svg" width="250px" />
</h1>

O projeto é um site desktop de registro de metas com progresso semanal. Esse é um projeto do evento NLW Pocket Javascript, um dos conteúdos disponíveis para alunos da Rocketseat.

## Requisitos

### Requisitos funcionais

- [ ✅ ] O organizador deve poder cadastrar uma nova meta;
- [ ✅ ] O organizador deve poder marcar uma meta como concluída;
- [ ✅ ] O organizador deve poder desmarcar uma meta concluída;
- [ ✅ ] O organizador deve poder visualizar o resumo semanal de metas;
- [ ✅ ] O organizador deve poder visualizar todas as metas da semana, sendo concluídas ou não;

### Regras de negócio

- [ ✅ ] A quantidade de uma meta só poderá chegar até o número definido na criação da meta;
- [ ✅ ] As metas que forem sendo criadas conforme o organizador desejar, não influenciará no progresso das metas semanais anteriores.

### Requisitos não-funcionais

## Comandos de execução

### Seed
npm run seed

### Executar em modo de desenvolvimento
npm run dev

### Executar em modo de produção

### Criar migrations
npx drizzle-kit generate

### Executar migrations
npx drizzle-kit migrate

### Executar o Drizzle Studio
npx drizzle-kit studio

## 🚀 Tecnologias

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [NodeJS](https://nodejs.org)
- [Fastify](https://fastify.dev)
- [DrizzleORM](https://nodejs.org/pt)
- [Typescript](https://www.typescriptlang.org)
- [PostgreSQL](https://www.postgresql.org)
- [Docker](https://www.docker.com)
- [BiomeJS](https://biomejs.dev)
- [Zod](https://zod.dev)

## :memo: Licença
Este projeto está sob a licença do MIT. Consulte a [LICENÇA](../LICENSE) para obter detalhes.
