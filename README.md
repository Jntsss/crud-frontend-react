# Frontend - Interface de Gerenciamento de Produtos

Este projeto é a interface de usuário (UI) para a aplicação de CRUD de Produtos, desenvolvido com **React.js** como requisito para a avaliação N1.

## Descrição do Sistema

O frontend consome a API RESTful fornecida pelo projeto `crud-backend-springboot`. Ele oferece uma interface web intuitiva onde o usuário pode visualizar os produtos em uma tabela, adicionar novos produtos através de um formulário, editar produtos existentes e removê-los do sistema.

A comunicação com o backend é realizada através de requisições HTTP, gerenciadas pela biblioteca **Axios**.

## Funcionalidades da Interface

* **Listagem de Produtos:** Exibe todos os produtos em uma tabela.
* **Criação de Produto:** Formulário para cadastrar um novo produto.
* **Edição de Produto:** Formulário (geralmente o mesmo da criação) para atualizar os dados de um produto.
* **Remoção de Produto:** Botão em cada linha da tabela para excluir o produto correspondente.

## Tecnologias Utilizadas

* **React.js:** Biblioteca para construção da interface de usuário.
* **Axios:** Para realizar as chamadas HTTP para a API do backend.
* **HTML5 & CSS3:** Para estruturação e estilização das páginas.
* **Node.js & NPM:** Ambiente de execução e gerenciador de pacotes.

## Como Executar o Projeto

**Pré-requisitos:**
* Node.js 18 ou superior.
* NPM 9 ou superior.
* **O backend (`crud-backend-springboot`) deve estar em execução para que a aplicação funcione corretamente.**

**Passos para execução:**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Jntsss/crud-frontend-react.git](https://github.com/Jntsss/crud-frontend-react.git)
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd crud-frontend-react
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm start
    ```

5.  **Acesse a aplicação:**
    O projeto será aberto automaticamente no seu navegador padrão no endereço `http://localhost:3000`.

## Autor

* **Jônatas de Souza Santos**
