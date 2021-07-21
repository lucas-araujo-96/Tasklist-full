require(`dotenv`).config(); //requisita o módulo dotenv e já o configura 

const express = require(`express`); //requisita o express
const path = require(`path`); //requisita o módulo path
const mongoose = require(`mongoose`); //requisita o módulo mongoose
const router = require(path.join(__dirname, `src`, `modules`, `routes`)); //requisita o arquivo de configuração de rotas

const server = express(); //instancia o servidor

server.use(express.static(path.resolve(__dirname, `public`))); //define a pasta de recursos estáticos
server.use(express.urlencoded({extended: true})); //habilita o uso de urlencoded para envio de informações por método POST
server.use(router); //habilita a configuração de rotas

mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => { //inicia a conexão ao mongo DB utilizando a variável de ambiente connectionString 
    console.log(`Database connected`);
    server.emit(`connectionReady`); //emite sinal ao suceder a conexão
}).catch((e) => { //capta erros da database
    console.log(`Database connection error: ${e}`);
});

server.set(`views`, path.resolve(__dirname, `src`, `views`)); //define a pasta de views
server.set(`view engine`, `ejs`); //define a engine de views

server.on(`connectionReady`, () => { //ao receber o sinal de que a database conectou...
    server.listen(port=32000, ()=> { //sobe o servidor na porta 32000, 
        console.log(`Server is listening at port: ${port}`);
        console.log(`To access, go to http://localhost:32000/`); //link para fácil acesso nesta interface
    });    
});


