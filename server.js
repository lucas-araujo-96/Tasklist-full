const express = require(`express`); //requisita o express
const path = require(`path`); //requisita o modulo path
const router = require(path.join(__dirname, `src`, `modules`, `routes`)); //requisita o arquivo de configuração de rotas

const server = express(); //gera o servidor

server.use(express.static(path.resolve(__dirname, `public`))); //define a pasta de recursos estáticos
server.use(express.urlencoded({extended: true})); //habilita o uso de urlencoded para envio de informações por método POST
server.use(router); //habilita a configuração de rotas

server.set(`views`, path.resolve(__dirname, `src`, `views`)); //define a pasta de views
server.set(`view engine`, `ejs`); ////define a engine de views

server.listen(port=32000, ()=> { //sobre o servidor na porta 32000, 
    console.log(`Server is listening at port: ${port}`);
    console.log(`To access, go to http://localhost:32000/`); //link para fácil acesso nesta interface
});
