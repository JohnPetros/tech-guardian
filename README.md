<h1 align="center">
  Tech Guardian 🛡️
</h1>

<div align="center">
   <a href="https://github.com/JohnPetros">
      <img alt="Made by JohnPetros" src="https://img.shields.io/badge/made%20by-JohnPetros-blueviolet">
   </a>
   <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/JohnPetros/tech-guardian">
   <a href="https://github.com/JohnPetros/tech-guardian/commits/main">
      <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/JohnPetros/tech-guardian">
   </a>
  </a>
   </a>
   <a href="https://github.com/JohnPetros/tech-guardian/blob/main/LICENSE.md">
      <img alt="GitHub License" src="https://img.shields.io/github/license/JohnPetros/tech-guardian">
   </a>
    <img alt="Stargazers" src="https://img.shields.io/github/stars/JohnPetros/tech-guardian?style=social">
</div>
<br>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre o Projeto</a> |
 <a href="#-demonstração">Demonstração</a> | 
 <a href="#-funcionalidades">Funcionalidades</a> | 
 <a href="#-práticas-de-acessibilidade-aplicadas">Práticas de acessibilidade aplicadas</a> | 
 <a href="#-deploy">Deploy</a> | 
 <a href="#-tecnologias">Tecnologias</a> | 
 <a href="#-como-rodar-a-aplicação">Como  rodar a aplicação?</a> | 
 <a href="#-como-contribuir">Como contribuir</a> | 
 <a href="#-layout">Layout</a> | 
 <a href="#-license">Licença</a>
</p>

## 🖥️ Sobre o Projeto

Esse é um projeto **Help Desk**, ou seja, uma aplicação voltada para registrar e solucionar problemas relacionado a algum hardware ou sistema de uma empresa.

No caso do **Tech Guardian**, há dois tipos de usuário: aquele que pode abrir chamados relatando a ocorrência de um problema relacionado a um patrimônio da empresa (denominado como **Tech**), e aquele que pode sugerir uma solução para resolver o problema em questão (denominado como **Guardian**).

O objetivo para a construção desse projeto foi estudar e aplicar conceitos básicos de backend, como autenticação, permissão de usuário, renderização estática, CRUD, paginação e filtragem de dados utilizando [NodeJs](https://nodejs.org/en/about) e [EJS](https://ejs.co/).

---

## ✨ Funcionalidades

### Autenticação de usuário
- [x] Deve ser possível	autenticar um usuário por e-mail e senha
- [x] Não deve ser possível	autenticar um usuário que não existe
- [x] Todas as ações por dentro do sistema devem exigir autenticação do usuário, caso contrário o usuário deve voltar para tela de autenticação
- [x] Deve ser possível verificar se um usuário é do tipo `Tech`, `Guardian` ou `Admin` 

### Cadastro de usuário
- [x] Deve ser possível cadastrar um usuário
- [x] Ao se cadastrar o usuário pode escolher ser do tipo `Tech` ou `Guardian`, mas não `Admin`
- [x] Não deve ser possível cadastrar um usuário já existente
- [x] O usuário cadastrado deve ter um avatar registrado por padrão
- [] Somente um usuário do tipo `Admin` pode cadastrar outro usuário do tipo `Admin`

### Listagem de chamados
- [x] Deve ser possível listar chamados, com seus respectivos dados, bem como o usuário que criou o chamado
- [x] Deve ser possível filtrar chamados título, patrimônio associado, data de criação ou por status (se está aberto/pendente ou fechado/solucionado)
- [x] Deve ser possível paginar os chamados 
- [x] Deve ser possível aplicar uma ou mais filtragens ao mesmo tempo
- [x] Qualquer tipo de usuário pode ver os chamados listados
- [ ] Na listagem de chamados fechados deve ser possível ver os dados do usuário que solucionou o chamado

### Criação de chamado
- [x] Deve ser possível criar um novo chamado
- [x] Chamados recém-criados deve estar com status aberto por padrão
- [x] Apenas usuários do tipo `Tech` podem criar chamados
- [x] Os dados do chamado podem ser lidos por qualquer tipo de usuário

### Solução de chamado
- [x] Deve ser possível enviar uma solução escrita que vise solucionar um chamado
- [x] Apenas usuários do tipo `Guardian` podem enviar soluções
- [x] Não deve ser possível enviar uma solução associado a um chamado que já esteja fechado, ou seja, solucionado
- [x] A solução enviada pode ser lida por qualquer tipo de usuário

### Abertura e fechamento de chamado
- [x] Deve ser possível abrir novamente um chamado
- [x] Somente chamados que estejam fechados podem ser abertos novamente
- [x] Somente chamados com solução podem ser fechados
- [x] Somente usuário do tipo `Tech` pode abrir novamente ou fechar um chamado
- [x] Somente o usuário que criou o chamado pode abri-lo novamente ou fechá-lo

### Edição de chamado
- [x] Deve ser possível editar os dados de um chamado 
- [x] Somente os dados inseridos ao criar um chamado podem ser editados 
- [x] Somente usuário do tipo `Tech` pode editar um chamado
- [x] Somente o usuário que criou o chamado pode editá-lo

### Deleção de chamado
- [x] Deve ser possível deletar um chamado
- [x] Não deve ser possível deletar um chamado que não existe
- [x] Somente usuário do tipo `Tech` pode deletar um chamado
- [x] Somente usuário que criou o chamado pode deletá-lo

### Usuário administrador
- [x] Todo e qualquer ação feita por um usuário do tipo `Tech` ou `Guardian` pode ser feita por um usuário do tipo `Admin`

### Cadastro de patrimônio
- [x] Deve ser possível cadastrar um patrimônio 
- [x] Não deve ser possível cadastrar um patrimônio já existente
- [x] Somente usuário do tipo `Admin` pode cadastrar um patrimônio

### Listagem de patrimônios
- [x] Deve ser possível listar patrimônios 
- [x] Deve ser possível filtrar os patrimônios por título
- [x] Deve ser possível paginar os patrimônios
- [x] Somente usuário do tipo `Admin` pode visualizar, filtrar e paginar os patrimônios

### Edição de patrimônio
- [x] Deve ser possível editar um patrimônio 
- [x] Não deve ser possível editar um patrimônio que não existe
- [x] Somente usuário do tipo `Admin` pode editar um patrimônio

### Deleção de patrimônio
- [x] Deve ser possível deletar um patrimônio 
- [x] Não deve ser possível deletar um patrimônio que não existe
- [x] Somente usuário do tipo `Admin` pode deletar um patrimônio

### Listagem de usuários
- [x] Deve ser possível listar usuários 
- [x] Deve ser possível filtrar os usuários por título ou por tipo (se é do tipo `Tech` ou `Guardian`)
- [x] Deve ser possível paginar os usuários
- [x] Somente usuário do tipo `Admin` pode visualizar, filtrar e paginar os usuários

### Edição de usuário
- [x] Deve ser possível editar a conta de um usuário
- [x] Somente o usuário que cadastrou a conta ou usuário do tipo `Admin` pode editá-la
- [x] Deve ser possível mudar o tipo de usuário (`Tech` ou `Guardian`, mas não do tipo `Admin`)
- [x] Dever ser possível mudar o avatar de usuário enviando um arquivo de imagem válido
- [x] Todos os dados do usuário são atualizados de uma vez, porém o usuário pode escolher altarar ou não sua senha
- [x] Somente usuário do tipo `Admin` pode mudar o tipo de outro usuário para `Admin` 

### Deleção de usuário
- [x] Deve ser possível deletar a conta de um usuário
- [x] Somente o usuário que cadastrou a conta ou um usuário do tipo `Admin` pode deletá-la

---

## 🛠️ Tecnologias

Este projeto foi desenvolvido usando as seguintes tecnologias:

✔️ **[HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)** Para a contrução das páginas

✔️ **[CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)** Para a estilização das páginas

✔️ **[JS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)** Para a criação de ações dinâmicas das páginas

✔️ **[NodeJs](https://react.dev/)** Para executar JS no lado do servidor e prover os recursos e as funcionalidades principais da aplicação

✔️ **[EJS](https://ejs.co/)** - para renderização de recursos estáticos como páginas HTML, arquivos CSS, JS e imagens

✔️ **[Phosphor icons](https://www.typescriptlang.org/)** - para exibição de ícones

✔️ **[PostgreSQL](https://www.postgresql.org/)** - banco de dados da aplicação

✔️ **[Knex](https://knexjs.org/)** - Para a construção automáticas de queries para interagir com o banco de dados 

> Para mais detalhes acerca das dependências do projeto veja o arquivo [package.json](https://github.com/JohnPetros/tech-guardian/blob/main/package.json)

---

## 🚀 Como rodar a aplicação?

### 🔧 Pré-requisitos

Antes de baixar o projeto você vai precisar ter instalado na sua máquina as seguintes ferramentas:

- [Git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/) ou [NPM](https://www.npmjs.com/)

> Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 📟 Rodando a aplicação

```bash

# Clone este repositório
$ git clone https://github.com/JohnPetros/tech-guardian.git

# Acesse a pasta do projeto
$ cd tech-guardian

# Instale as dependências
$ npm install 
# ou
$ yarn add

# Execute as migrations do banco de dados
$ knex migrate:latest

# Execute a aplicação em modo de desenvolvimenro
$ npm run dev 
# ou
$ yarn dev

# Provavelmente a aplicação estará rodando na porta 3000, então acesse http://localhost:3333

```

> Além disto é crucial configurar as variáveis de ambiente em um arquivo chamado `.env` antes de executar a aplicação. veja o arquivo [.env.example](https://github.com/JohnPetros/tech-guardian/blob/main/.env.example) para ver quais variáveis devem ser configuradas

---

## ⚙️ Deploy

O deploy dessa aplicação foi realizada usando a plataforma da **[Render](https://dashboard.render.com/)**, o que implica dizer que você pode acessar aplicação funcionando acessando esse **[link](https://tech-guardian-app.onrender.com/)**.

---

## 💪 Como contribuir

```bash

# Fork este repositório
$ git clone https://github.com/JohnPetros/tech-guardian.git

# Cria uma branch com a sua feature
$ git checkout -b minha-feature

# Commit suas mudanças:
$ git commit -m 'feat: Minha feature'

# Push sua branch:
$ git push origin minha-feature

```

> Você deve substituir 'minha-feature' pelo nome da feature que você está adicionando

> Você também pode abrir um [nova issue](https://github.com/JohnPetros/tech-guardian/issues) a respeito de algum problema, dúvida ou sugestão para o projeto. Ficarei feliz em poder ajudar, assim como melhorar este projeto

---

## 🎨 Layout

O design do projeto, assim como a ideia geral é inpirado no [RocketHelp](https://github.com/rocketseat-education/ignite-lab-rockethelp), aplicativo desenvolvido no evento Ignite Lab 03 - React Native da [Rocketseat](CjwKCAjw69moBhBgEiwAUFCx2CWmOAmXu).

---

## 📝 Licença

Esta aplicação está sob licença do MIT. Consulte o [Arquivo de licença](LICENSE) para obter mais detalhes sobre.

---

<p align="center">
   Feito 💜 by John Petros 👋🏻
</p>
