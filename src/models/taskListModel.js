const mongoose = require(`mongoose`); //requisita o módulo mongoose

const taskListSchema = new mongoose.Schema({ //Esquema: estrutura de dados das listas de tarefas no banco de dados
    userID: {type: String, required: true},
    taskListString: {type: String, required: false},
});

const taskListModel = mongoose.model(`taskList`, taskListSchema); //gera o modelo com o esquema acima

module.exports = taskListModel; //exporta o modelo