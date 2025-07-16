# 🩺 AgendaMedAPI

API do sistema **AgendaMed**, uma plataforma que conecta médicos e pacientes para agendamento de consultas, telemedicina, e gestão de perfis clínicos.

---

## 📐 Arquitetura

Este projeto segue o padrão de **Arquitetura Hexagonal (Ports and Adapters)** com separação clara entre camadas:

- `domain`: Entidades e lógica de negócio pura
- `core`: Portas de entrada/saída (DTOs, interfaces de serviços e repositórios)
- `application`: Casos de uso e orquestração
- `infrastructure`: Adapters (HTTP, banco, segurança, etc)
- `api/rest`: Controllers e documentação Swagger

---

## 🚀 Tecnologias

- **Node.js**
- **NestJS**
- **TypeScript**
- **PostgreSQL**
- **MongoDB**
- **Redis**
- **Swagger**
- **JWT**

---

## 🔧 Requisitos

- **Node.js** 22+
- **Docker** e **Docker Compose**
- **npm**

---

## ▶️ Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/agendamed-hexa-api.git
   cd agendamed-hexa-api
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Suba os serviços de banco de dados e cache:**
   ```bash
   docker-compose up -d
   ```

4. **Configure as variáveis de ambiente:**
   - Copie `.env.example` para `.env` e ajuste conforme necessário.

5. **Rode as migrations do Prisma:**
   ```bash
   npx prisma migrate dev
   ```

6. **Inicie a aplicação:**
   ```bash
   npm run start:dev
   ```

7. **Acesse a documentação Swagger:**
   - [http://localhost:3000/api](http://localhost:3000/api)
