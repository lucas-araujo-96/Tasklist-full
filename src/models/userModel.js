const mongoose = require(`mongoose`); //requisita o mongoose

const userSchema = new mongoose.Schema({ //Esquema: estrutura de dados dos usuários no banco de dados
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
});

const userModel = mongoose.model(`User`, userSchema); //gera o modelo com o esquema acima

module.exports = userModel; //exporta o modelo