const path = require(`path`); //requisita o módulo path
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`)); //requisita o modelo de usuário
const taskListModel = require(path.join(__dirname, `..`, `models`, `taskListModel`));

exports.loginGet = async (req, res) => { //responde a página de login a um GET
    if(req.session.user) { //caso exista uma sessão logada...
        taskListModel.findOne({userID: req.session.user.id}).then((currentList) => {//vai para a página principal
            res.render(`main`, {list: currentList.taskListString});
        });
    } else {
        res.render(`login`); //caso não, vai para o login
    };
};

exports.loginPost = (req, res) => {
    userModel.findOne({ username: req.body.login, password: req.body.password}, `name id`).then((query) => { //busca um usuário com login e senha
        if(query.length != 0) { //caso exista...
            req.session.user = { name: query.name, id: query._id }; // salva nome e id na sessão
            taskListModel.findOne({userID: req.session.user.id}).then((currentList) => { //e vai pra página principal
                res.render(`main`, {list: currentList.taskListString});
            });
        } else { //caso não...
            res.render(`login`); //volta pro login
        };
    });
};