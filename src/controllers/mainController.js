const path = require(`path`); //requisita o módulo path
const taskListModel = require(path.join(__dirname, `..`, `models`, `taskListModel`)); //requisita o modelo de lista de tarefas

exports.mainGet = async (req, res) => { //get da página

    const list = await taskListModel.findOne({userID: req.session.user.id.toString()}); //consulta a lista de tarefas do usuário com base em seu ID
    if(list) res.render(`main`, {list: list.taskListString, name: req.session.user.name}); //se existir, é passada para a página
    else res.render(`main`, {list: null, name: req.session.user.name}); //caso não, é passo um valor null

};
    
exports.logoff = (req, res) => { //para o link de logoff

    req.session.user = undefined; //"desdefine" o cookie do usuário
    res.redirect(`/login`); //volta pra página de login

};

exports.updateTaskList = async (req, res) => { //para atualizar a lista de tarefas do usuário

    const taskList = await taskListModel.findOne({userID: req.session.user.id.toString()}); //localiza o documento da lista de tarefas do usuário com base em seu id
    
    if(!taskList) { //se não existir
        await taskListModel.create({userID: req.session.user.id.toString(), taskListString: JSON.stringify(req.body)}); //cria um novo
    } else { //do contrário
        taskList.taskListString = JSON.stringify(req.body); //atualiza a string da lista de tarefas
        await taskList.save(); //salva
    };

    res.end(); //fecha a conexão
    return;
};