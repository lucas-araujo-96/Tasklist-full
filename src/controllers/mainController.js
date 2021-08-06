const path = require(`path`); //requisita o módulo path
const taskListModel = require(path.join(__dirname, `..`, `models`, `taskListModel`)); //requisita o modelo de lista de tarefas

exports.mainGet = async (req, res) => { //get da página

    const list = await taskListModel.findOne({userID: req.session.user.id.toString()}); //consulta a lista de tarefas do usuário com base em seu ID
    if(list) return res.render(`main`, {list: list.taskListString, name: req.session.user.name}); //se existir, é passada para a página
    else return res.render(`main`, {list: null, name: req.session.user.name}); //caso não, é passo um valor null

};
    
exports.logoff = (req, res) => { //para o link de logoff

    req.session.user = undefined; //"desdefine" a sessão
    return res.redirect(`/login`); //volta pra página de login

};

exports.updateTaskList = async (req, res) => { //para atualizar a lista de tarefas do usuário no BD

    const taskList = await taskListModel.findOne({userID: req.session.user.id.toString()}); //localiza o documento da lista de tarefas do usuário com base em seu id
    
    //se não existir, cria uma nova
    if(!taskList) return await taskListModel.create({userID: req.session.user.id.toString(), taskListString: JSON.stringify(req.body)});

    taskList.taskListString = JSON.stringify(req.body); //atualiza a string da lista de tarefas
    await taskList.save(); //salva
    return res.end(); //fecha a conexão

};