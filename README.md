# VR Store Web

![GitHub repo size](https://img.shields.io/github/repo-size/AllanGaiteiro/project-reply-playstation-store-web-angular?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/AllanGaiteiro/project-reply-playstation-store-web-angular?style=for-the-badge)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d46c2a0943e549f3a39f5be01a573a6e)](https://app.codacy.com/gh/AllanGaiteiro/vr-store-web?utm_source=github.com&utm_medium=referral&utm_content=AllanGaiteiro/vr-store-web&utm_campaign=Badge_Grade)
[![Link do Swagger](https://img.shields.io/badge/-Swagger-49BE?style=for-the-badge)](https://vr-store-app-f49680f6875e.herokuapp.com/api-docs)
[![Link para a Página Inicial](https://img.shields.io/badge/Página%20Inicial-ffffff?style=for-the-badge&color=1e3c66)](https://vr-store-app.web.app/) 

## Descrição do Projeto

O projeto **VR Store Web** é uma aplicação web desenvolvida em **Angular** com **TypeScript**, voltada para a gestão de produtos. A aplicação permite a visualização, cadastro, edição e exclusão de produtos, oferecendo uma interface intuitiva para interagir com os dados. O sistema oferece funcionalidades de filtro, paginação e ordenação de produtos, proporcionando uma experiência eficiente para o usuário.

## Funcionalidades

### Página de Consulta de Produtos

- **Filtros**: Permite a busca de produtos por:
  - **Código** (ID do produto)
  - **Descrição** (termos contidos na descrição)
  - **Custo** (valor de aquisição)
  - **Preço de Venda** (valor de venda nas lojas)

- **Tabela de Dados**: Exibe os produtos filtrados com as colunas:
  - Código
  - Descrição
  - Preço de Venda

- **Ações**:
  - **Incluir**: Navega para o cadastro de um novo produto.
  - **Editar**: Redireciona para a edição do produto selecionado.
  - **Excluir**: Remove o produto e suas dependências do sistema.

### Cadastro de Produto

Permite a criação ou edição de produtos com os seguintes campos:
- **Código**: Gerado automaticamente.
- **Descrição**: Campo obrigatório (alfanumérico, até 60 caracteres).
- **Custo**: Campo opcional (aceita formato numérico 13,3).
- **Imagem**: Upload opcional (.png e .jpg).

### Dialog Modal - Alteração/Inclusão de Preço

- **Loja**: Select obrigatório que lista as lojas cadastradas.
- **Preço de Venda**: Campo obrigatório (formato numérico 13,3).

**Ações**:
- **Salvar**: Valida os campos obrigatórios e salva o preço, impedindo duplicidade de preço para a mesma loja.
- **Fechar**: Fecha o modal sem salvar.

## Tecnologias Utilizadas

- **Angular** (v18.2.7) com **TypeScript**
- **Angular Material** e **FontAwesome** para UI/UX
- **Jest** para testes unitários com cobertura mínima de 80%

## Como Executar o Projeto

1. Instalar as dependências:
   ```bash
   npm install
   ```

2. Iniciar o servidor de desenvolvimento:
   ```bash
   npm start
   ```

2. Iniciar o servidor de produção:
   ```bash
   npm start:prod
   ```
A aplicação estará disponível em `http://localhost:4200`.

## Testes

Para rodar os testes unitários:

```bash
npm test
```

---

Feito com 💻 por [Allan Gaiteiro](https://github.com/AllanGaiteiro)
```
