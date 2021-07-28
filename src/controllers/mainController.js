const path = require(`path`); //requisita o módulo path
const taskListModel = require(path.join(__dirname, `..`, `models`, `taskListModel`)); //requisita o modelo de lista de tarefas

exports.logoff = (req, res) => { //para o link de logoff
    req.session.user = undefined; //"desdefine" o cookie do usuário
    res.render(`login`); //volta pra página de login
};

exports.updateTaskList = async (req, res) => { //para atualizar a lista de tarefas do usuário
    const taskList = await taskListModel.findOne({userID: req.session.user.id.toString()}); //localiza o documento da lista de tarefas do usuário com base em seu id
    if (taskList === null) await taskListModel.create({userID: req.session.user.id.toString(), taskListString: ``}); //caso o documento não exista, cria um novo com o id de usuário e a lista de tarefas vazia
    taskList.taskListString = JSON.stringify(req.body); //atualiza a string da lista de tarefas
    await taskList.save(); //salva
    res.end(); //encerra a conexão
};