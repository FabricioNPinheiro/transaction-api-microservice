# Transaction API Microservice

Esta é uma API de gerenciamento de transações. A API se comunica com outros microserviços via RabbitMQ, permitindo a troca de mensagens assíncronas.

## Descrição

A API oferece recursos para gerenciar transações. Além disso, ela se comunica com outros microserviços utilizando RabbitMQ para enviar e receber mensagens de maneira assíncrona.

### Funcionalidades

# Funcionalidades

- Cadastro
- Detalhes de uma transferência pelo ID
- Listagem de transferências de um usuário


## Tecnologias Utilizadas

- **Node.js** para a construção da API.
- **Express.js** para gerenciar rotas e requisições.
- **RabbitMQ** para comunicação assíncrona entre microserviços.
- **Prisma** para ORM e interação com o banco de dados.
- **TypeScript** para tipagem estática.
- **ESLint e Prettier** para formatação e linting de código.

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (v18 ou superior)
- RabbitMQ em funcionamento (ou use uma instância em um serviço como o CloudAMQP)
- Banco de dados configurado (utilizando Prisma)
