# Caneca Cheia

[English](#english)
|
[Português](#português)

![GitHub repo size](https://img.shields.io/github/repo-size/iLuiszin/Caneca-Cheia?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/iLuiszin/Caneca-Cheia?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/iLuiszin/Caneca-Cheia?style=for-the-badge)

<img src="https://cdnm.westwing.com.br/glossary/uploads/br/2015/02/02195523/caneca-de-chopp-bem-gelada_pinterest_c-a1849.jpg" width="60%" />

## English

## Project Status

![Success Badge](https://img.shields.io/badge/State-Success-brightgreen?style=for-the-badge)


## Project Description

<div style="text-align: justify"> 
  Caneca Cheia is a web application developed for a web technologies course project. It serves as an online platform for selling beverages. The application features user authentication, including administrator accounts. MongoDB is used as the backend database, React powers the frontend, and Node.js serves as the backend.
</div>

## 📁 Access the Project

The project is hosted on GitHub: [Caneca Cheia GitHub Repository](https://github/iLuiszin/Caneca-Cheia)

You can also access the live version of the project at: [https://caneca-cheia.vercel.app/](https://caneca-cheia.vercel.app/)

## 📝 Requirements

Before running the project, make sure you have a `.env` file at the root of the project with the following environment variables:

```plaintext
MONGODB_URI=<your_mongodb_uri>
CLIENT_URL=http://localhost:3000
ACCESS_TOKEN_SECRET=<your_access_token_secret>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
PORT=5000
CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUD_API_KEY=<your_cloudinary_api_key>
CLOUD_API_SECRET_KEY=<your_cloudinary_api_secret_key>
ENVIRONMENT=development
```

## 🔨 Project Features

- **User Authentication**: Users can create accounts, log in, and log out. An administrator login is available for managing products.

- **Administrator Dashboard**: Administrators have access to a dashboard where they can add and edit products available for sale.

- **Product Catalog**: Users can browse a catalog of available products, view details, and add items to their cart.

- **Shopping Cart**: Users can add and remove products from their shopping cart, and view the total cost of items.

- **Secure Payment**: The checkout process includes payment via PicPay, ensuring a secure and convenient transaction.

- **Frontend with React**: The user interface is built using React, providing a dynamic and responsive experience.

- **Backend with Node.js**: The server-side logic is implemented using Node.js, handling requests and interactions with the database.

- **Database with MongoDB**: MongoDB is used to store product and user information, ensuring efficient data management.

- **Continuous Hosting**: The application is hosted on Vercel, allowing continuous access and availability 24/7.

## ▶ Run  the Project

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/iLuiszin/Caneca-Cheia.git`
2. Install backend dependencies and start the backend server
    ```console
    npm install
    npm start
    ```
3. Navigate to the client directory `cd client` to install and start the frontend:
    ```console
    npm install
    npm start
    ```
4. Access the application in your browser at: http://localhost:3000/

## 👨‍💻 Authors

| [<img src="https://avatars.githubusercontent.com/u/79981019?v=4" width=115><br><sub>Luis felipe</sub>](https://github.com/iLuiszin)
| :---: |

## Learning Resources

For more information on Node.js, JavaScript, and React, you can refer to the official documentation:

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [JavaScript MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [React Documentation](https://reactjs.org/docs/getting-started.html)

Feel free to reach out if you have any questions or suggestions!


## Português

## Status do Projeto

![Emblema de Sucesso](https://img.shields.io/badge/Estado-Sucesso-brightgreen?style=for-the-badge)

## Descrição do Projeto

<div style="text-align: justify"> 
  Caneca Cheia é uma aplicação web desenvolvida para um projeto de curso de tecnologias web. Ela serve como uma plataforma online para venda de bebidas. A aplicação possui autenticação de usuários, incluindo contas de administrador. MongoDB é usado como o banco de dados backend, React alimenta o frontend e Node.js serve como o backend.
</div>

## 📁 Acesso ao Projeto

O projeto está hospedado no GitHub: [Repositório Caneca Cheia no GitHub](https://github.com/iLuiszin/Caneca-Cheia)

Você também pode acessar a versão ao vivo do projeto em: [https://caneca-cheia.vercel.app/](https://caneca-cheia.vercel.app/)

## 📝 Requisitos

Antes de executar o projeto, certifique-se de ter um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```plaintext
MONGODB_URI=<sua_uri_do_mongodb>
CLIENT_URL=http://localhost:3000
ACCESS_TOKEN_SECRET=<seu_access_token_secret>
REFRESH_TOKEN_SECRET=<seu_refresh_token_secret>
PORT=5000
CLOUD_NAME=<seu_nome_de_nuvem_do_cloudinary>
CLOUD_API_KEY=<sua_chave_api_do_cloudinary>
CLOUD_API_SECRET_KEY=<sua_chave_secreta_api_do_cloudinary>
ENVIRONMENT=development
```

## 🔨 Funcionalidades do Projeto

- **Autenticação de Usuários**: Os usuários podem criar contas, fazer login e sair. Um login de administrador está disponível para gerenciar produtos.

- **Painel de Controle do Administrador**: Administradores têm acesso a um painel onde podem adicionar e editar produtos disponíveis para venda.

- **Catálogo de Produtos**: Os usuários podem navegar por um catálogo de produtos disponíveis, visualizar detalhes e adicionar itens ao carrinho.

- **Carrinho de Compras**: Os usuários podem adicionar e remover produtos do carrinho de compras e visualizar o custo total dos itens.

- **Pagamento Seguro**: O processo de checkout inclui pagamento via PicPay, garantindo uma transação segura e conveniente.

- **Frontend com React**: A interface do usuário é construída usando React, proporcionando uma experiência dinâmica e responsiva.

- **Backend com Node.js**: A lógica do lado do servidor é implementada usando Node.js, lidando com solicitações e interações com o banco de dados.

- **Banco de Dados com MongoDB**: MongoDB é usado para armazenar informações de produtos e usuários, garantindo uma gestão eficiente de dados.

- **Hospedagem Contínua**: A aplicação está hospedada na Vercel, permitindo acesso contínuo e disponibilidade 24/7.

## ▶ Executando o Projeto

Para executar o projeto localmente, siga estas etapas:

1. Clone o repositório: `git clone https://github.com/iLuiszin/Caneca-Cheia.git`
2. Instale as dependências do backend e inicie o servidor backend
    ```console
    npm install
    npm start
    ```
3. Navegue até o diretório do cliente `cd client` para instalar e iniciar o frontend:
    ```console
    npm install
    npm start
    ```
4. Acesse a aplicação no seu navegador em: http://localhost:3000/

## 👨‍💻 Autores

| [<img src="https://avatars.githubusercontent.com/u/79981019?v=4" width=115><br><sub>Luis Felipe</sub>](https://github.com/iLuiszin)
| :---: |

## Recursos de Aprendizado

Para mais informações sobre Node.js, JavaScript e React, você pode consultar a documentação oficial:

- [Documentação do Node.js](https://nodejs.org/en/docs/)
- [Documentação JavaScript MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Documentação do React](https://reactjs.org/docs/getting-started.html)

Sinta-se à vontade para entrar em contato se tiver alguma dúvida ou sugestão!
