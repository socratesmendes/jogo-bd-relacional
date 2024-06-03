# Express Prisma API

Este projeto é uma API REST básica criada com Express e Prisma como ORM.

## Requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Passos para Configuração

### 1. Configurar um novo projeto Node.js

1. Crie uma nova pasta para o projeto e navegue até ela:

   ```sh
   mkdir express-prisma-api
   cd express-prisma-api
   ```

2. Inicialize um novo projeto Node.js:

   ```sh
   npm init -y
   ```

### 2. Instalar as Dependências

1. Instale o Express:

   ```sh
   npm install express
   ```

2. Instale o Prisma CLI como uma dependência de desenvolvimento:

   ```sh
   npm install prisma --save-dev
   ```

3. Inicialize o Prisma:

   ```sh
   npx prisma init
   ```

   Este comando cria uma pasta `prisma` com um arquivo `schema.prisma` e um arquivo `.env` na raiz do projeto.

4. Instale o cliente Prisma:

   ```sh
   npm install @prisma/client
   ```

### 3. Configurar o Prisma

1. No arquivo `.env`, configure a URL do banco de dados. Por exemplo, para um banco de dados SQLite:

   ```env
   DATABASE_URL="file:./dev.db"
   ```

2. No arquivo `prisma/schema.prisma`, defina os modelos. Por exemplo, um modelo `User`:

   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }

   model User {
     id    Int     @id @default(autoincrement())
     name  String
     email String  @unique
   }
   ```

3. Execute a migração para criar o banco de dados e as tabelas:

   ```sh
   npx prisma migrate dev --name init
   ```

   Este comando cria a estrutura inicial do banco de dados com base no esquema definido.

### 4. Criar o Servidor Express

1. Crie um arquivo `index.js` e configure o servidor Express:

   ```js
   const express = require("express");
   const { PrismaClient } = require("@prisma/client");
   const prisma = new PrismaClient();

   const app = express();
   app.use(express.json());

   app.get("/", (req, res) => {
     res.send("Hello World!");
   });

   // Rota para listar todos os usuários
   app.get("/users", async (req, res) => {
     const users = await prisma.user.findMany();
     res.json(users);
   });

   // Rota para criar um novo usuário
   app.post("/users", async (req, res) => {
     const { name, email } = req.body;
     const user = await prisma.user.create({
       data: {
         name,
         email,
       },
     });
     res.json(user);
   });

   // Rota para atualizar um usuário
   app.put("/users/:id", async (req, res) => {
     const { id } = req.params;
     const { name, email } = req.body;
     const user = await prisma.user.update({
       where: { id: Number(id) },
       data: { name, email },
     });
     res.json(user);
   });

   // Rota para deletar um usuário
   app.delete("/users/:id", async (req, res) => {
     const { id } = req.params;
     await prisma.user.delete({
       where: { id: Number(id) },
     });
     res.json({ message: "User deleted" });
   });

   const port = 3000;
   app.listen(port, () => {
     console.log(`Server is running on http://localhost:${port}`);
   });
   ```

### 5. Testar a API

1. Inicie o servidor:

   ```sh
   node index.js
   ```

2. Use um cliente HTTP como Postman ou Insomnia, ou até mesmo `curl`, para testar as rotas `/users`.

## Rotas da API

- `GET /users`: Retorna uma lista de todos os usuários.
- `POST /users`: Cria um novo usuário. Requer um corpo JSON com `name` e `email`.
- `PUT /users/:id`: Atualiza um usuário existente pelo `id`. Requer um corpo JSON com `name` e `email`.
- `DELETE /users/:id`: Deleta um usuário pelo `id`.

## Conclusão

Você configurou com sucesso uma API REST básica usando Express e Prisma. Você pode expandir esta estrutura adicionando mais modelos e rotas conforme necessário.
