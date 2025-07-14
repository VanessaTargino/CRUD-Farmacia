# CRUD-Farmácia

Este projeto é uma API RESTful desenvolvida com **NestJS** para gerenciamento de uma farmácia. Ele permite o cadastro e controle de **produtos** e **categorias**, incluindo relacionamento entre essas entidades.

## 📚 Funcionalidades

- CRUD completo de **Categorias**
- CRUD completo de **Produtos**
- Relacionamento entre Produtos e Categorias
- Organização por módulos: controller, service, repository e entity
- Integração com banco de dados relacional via TypeORM

## 🛠️ Tecnologias Utilizadas

- Node.js
- NestJS
- TypeScript
- TypeORM
- PostgreSQL (ou outro banco de dados relacional)

## 🗂️ Estrutura de Pastas

```
src/
├── categoria/
│   ├── categoria.controller.ts
│   ├── categoria.service.ts
│   ├── categoria.repository.ts
│   ├── categoria.entity.ts
│   └── categoria.module.ts
├── produto/
│   ├── produto.controller.ts
│   ├── produto.service.ts
│   ├── produto.repository.ts
│   ├── produto.entity.ts
│   └── produto.module.ts
├── app.module.ts
└── main.ts
```

## ⚙️ Como Executar o Projeto

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/CRUD-Farmacia.git
cd CRUD-Farmacia
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente em um arquivo `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=farmacia
```

4. Execute o projeto:
```bash
npm run start:dev
```

## 👩‍💻 Autora

Desenvolvido por **Vanessa Targino**.
