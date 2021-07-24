# ProjetoTaskList-FullSystem

Sistema de lista de tarefas incluindo front-end e back-end: 

>Servidor node.js com Express (config em /server.js) (em projeto);<br />
>Views em ejs (em src/views) (em projeto);<br />
>Banco de dados MongoDB (modelos em src/models) (em projeto);<br />

Projeto pessoal para estudo, desenvolvimento de uma lista de tarefas com servidor node e front com views em ejs, banco de dados MongoDB em cloud com sistema de login completo com criação de usuário, alteração de dados e possibilidade de deletar conta.

-pasta node_modules omitida do armazenamento, mas os requisitos estão identificados em package.json, use npm install na pasta para instalá-los;<br />
<br />
-use npm run server para iniciar o servidor;<br />
<br />
-arquivo .env omitido devido à presença de informações restritas, única variável presente é CONNECTIONSTRING='suaStringDeConexaoAqui', basta criar o arquivo em /;<br />
<br />
-módulo nodemon está sendo usado no desenvolvimento por praticidade, caso não deseje utilizá-lo, é necessário alterar o script "server" em package.json para "node server.js";<br />