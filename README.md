# 📌 **Tech Challenge Mobile**

## 📝 **Descrição do Projeto**
Este sistema foi desenvolvido para facilitar a interação entre **professores** e **estudantes** por meio da criação, visualização e interação com **posts educacionais**. Professores podem compartilhar conteúdos e estudantes podem visualizar e comentar nos posts. O sistema conta com autenticação JWT e um backend robusto utilizando **Node.js, Express e MongoDB**, além de um frontend mobile desenvolvido em **React Native**.

---

## ⚙ **Tecnologias Utilizadas**
### 🔹 **Backend**
- **Node.js** (Ambiente de execução JavaScript)
- **Express.js** (Framework para API REST)
- **MongoDB** (Banco de dados NoSQL)
- **Mongoose** (ORM para MongoDB)
- **JWT (JSON Web Token)** (Autenticação segura)
- **Cors e Helmet** (Segurança)

### 🔹 **Frontend**
- **React Native** (Framework para aplicações móveis)
- **Axios** (Requisições HTTP)
- **AsyncStorage** (Armazenamento local do token JWT)

### 🔹 **Outras Ferramentas**
- **Postman** (Testes de API)
- **Expo** (Execução da aplicação mobile)

---

## 🏗 **Arquitetura do Sistema**
O sistema segue um modelo **cliente-servidor**, onde:
- **Backend (API REST)**: Responsável por gerenciar usuários, posts e comentários.
- **Frontend (React Native)**: Interface para interação com os usuários.
- **Banco de Dados (MongoDB)**: Armazena usuários, posts e comentários.

---

## 🚀 **Instalação e Configuração**
### 🔹 **Pré-requisitos**
Antes de iniciar, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### 🔹 **Passos para Executar o Projeto**
#### **1️⃣ Clonar o repositório**
```sh
 git clone https://github.com/seu-usuario/seu-repositorio.git
 cd seu-repositorio
```
#### **2️⃣ Configurar o Backend**
```sh
 cd backend
 npm install
```
📌 **Criar um arquivo `.env` na pasta `backend` com as variáveis:**
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/nome-do-banco
JWT_SECRET=sua_chave_secreta
```
🔹 **Executar o backend:**
```sh
npm start
```

#### **3️⃣ Configurar o Frontend**
```sh
 cd frontend
 npm install
```
🔹 **Executar o aplicativo React Native:**
```sh
npx expo start
```
Agora, escaneie o QR Code no seu celular para rodar o app!

---

## 🛠 **Principais Funcionalidades**
✅ **Autenticação JWT** (Login e Registro)  
✅ **Professores podem criar, editar e excluir posts**  
✅ **Estudantes podem visualizar e comentar nos posts**  
✅ **Exibição do nome do autor dos posts e comentários**  
✅ **Persistência de login com AsyncStorage**  
✅ **Interface mobile intuitiva e responsiva**  

---

## 📌 **Rotas da API**
### 🔹 **Autenticação**
- `POST /auth/register` → Cadastro de usuário
- `POST /auth/login` → Login e obtenção do token JWT

### 🔹 **Posts**
- `GET /posts` → Retorna todos os posts
- `GET /posts/students` → Retorna os posts visíveis para estudantes
- `POST /posts` → Criação de post (apenas professores)
- `PUT /posts/:id` → Edição de post (apenas autor)
- `DELETE /posts/:id` → Exclusão de post (apenas autor)

### 🔹 **Comentários**
- `POST /posts/:id/comments` → Adiciona comentário a um post

---

## 🏆 **Desafios e Soluções**
🔹 **Erro 500 ao buscar posts no celular (Expo)** → Corrigido ajustando a ordem das rotas no Express.  
🔹 **JWT não sendo persistido no AsyncStorage** → Resolvido com logs de depuração e ajustes na lógica de requisição.  
🔹 **Exibição do nome do autor no post** → Implementado `.populate('author', 'name')` no MongoDB.  

---

## 📢 **Melhorias Futuras**
- 🔹 **Upload de arquivos e imagens nos posts**
- 🔹 **Notificações push para novas postagens**
- 🔹 **Sistema de curtidas e favoritos**

---

## 🎯 **Conclusão**
Este sistema foi desenvolvido para facilitar a disseminação de conteúdos educacionais entre professores e estudantes. A plataforma conta com autenticação segura, um backend robusto e uma interface intuitiva no frontend. Durante o desenvolvimento, enfrentamos desafios técnicos que foram solucionados com boas práticas e melhorias contínuas.

📌 **Desenvolvido por Gustavo Teixeira Dev** 🚀

