require(`dotenv`).config(); //requisita o módulo dotenv e já o configura 

const express = require(`express`); //requisita o express
const path = require(`path`); //requisita o módulo path
const mongoose = require(`mongoose`); //requisita o módulo mongoose
const session = require(`express-session`); //requisita o módulo express-session
const connectMongo = require(`connect-mongo`); //requisita o módulo connect-mongo
const router = require(path.join(__dirname, `src`, `modules`, `routes`)); //requisita o arquivo de configuração de rotas
const routeProtection = require(path.join(__dirname, `src`, `middlewares`, `routeProtection`)); //requisita o módulo de proteção de rotas

const server = express(); //instancia o servidor
const sessionOptions= session({ //define opções para a sessão
    secret: `n0n30fy0urbus1ness`,
    store: connectMongo.create({mongoUrl: process.env.CONNECTIONSTRING}), //usa o connectMongo para abrir uma nova conexão para guardar dados de sessão no BD
    resave: false,
    saveUninitialized: false,
    cookie: { //define o cookie
        maxAge: 1000*60*60,
    },
});

server.use(express.static(path.resolve(__dirname, `public`))); //define a pasta de recursos estáticos
server.use(express.urlencoded({extended: true})); //habilita o uso de urlencoded para envio de informações por método POST
server.use(express.json()); //habilita a postagem de dados em JSON
server.use(sessionOptions); //habilita o uso de sessões
//server.use(routeProtection); //faz o servidor usar a proteção de rotas
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


