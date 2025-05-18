# API LAB

Este projeto é uma API completa construída com Node.js e Express, utilizando Sequelize para ORM e MySQL como banco de dados.  
Conta com autenticação segura via JWT, upload de arquivos com Multer, envio de e-mails com Nodemailer (Mailtrap), validação de dados com Yup e gerenciamento de filas com Bee-Queue e Redis.  
Esse é um projeto pessoal desenvolvido para estudos e aprofundamento em Node.js, seguindo padrões de arquitetura e boas práticas de desenvolvimento backend.  

---

## 🚀 Funcionalidades

- Cadastro, listagem, atualização e remoção de usuários
- Autenticação com JWT
- Upload de arquivos com Multer
- Envio de e-mails automáticos com Nodemailer
- Validação de dados com Yup
- Migrations e models com Sequelize
- Relacionamento entre usuários e arquivos
- Fila de jobs com Bee-Queue e Redis (opcional)
- Variáveis de ambiente com dotenv

---

## 🛠️ Tecnologias

- **Node.js**
- **Express**
- **Sequelize** (MySQL)
- **Multer**
- **Nodemailer**
- **Yup**
- **JWT**
- **Bee-Queue** (opcional)
- **Redis** (opcional)

---

## ⚙️ Instalação
*Substitua YARN por NPX se estiver usando NPM*

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/kxtukI/api-lab.git
   cd api-lab
   ```

2. **Instale as dependências:**
   ```bash
   yarn install
   ```

3. **Configure o arquivo `.env`** com suas credenciais de banco, JWT, e-mail e Redis.

4. **Crie o banco de dados:**.
   ```bash
   yarn sequelize-cli db:create
   ```

4. **Rode as migrations:**
   ```bash
   yarn sequelize-cli db:migrate
   ```

5. **Inicie o servidor:**
   ```bash
   yarn dev
   ```

---

## 📚 Rotas principais

- `POST   /sessions` — Login (retorna token JWT)
- `POST   /users` — Cadastro de usuário
- `PUT    /users/:id` — Atualização de usuário (autenticado)
- `GET    /users` — Listagem de usuários (autenticado)
- `POST   /files` — Upload de arquivo (autenticado, campo: `file`)
- Outras rotas para customers e contacts

---

## 📁 Upload de Arquivos

- Os arquivos são salvos em `tmp/uploads`.
- Para enviar, use multipart/form-data com o campo `file`.

---

## ✉️ Envio de E-mails

- Configurado para Mailtrap por padrão.
- Altere as variáveis no `.env` para usar outro serviço.

---

## 🕒 Fila de Jobs (opcional)

- Para envio assíncrono de e-mails, configure o Redis e descomente o uso da fila.

---

## 📝 Scripts úteis
*Substitua YARN por NPX se estiver usando NPM*
- `yarn dev` — Inicia o servidor em modo desenvolvimento
- `yarn sequelize-cli db:migrate` — Executa as migrations
- `yarn sequelize-cli db:migrate:undo` — Desfaz a última migration