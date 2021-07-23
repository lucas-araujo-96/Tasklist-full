const path = require(`path`);
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`));

exports.loginGet = (req, res) => { //responde a página de login a um GET
    if(req.session.user) { //caso exista uma sessão logada...
        res.render(`main`); //vai para a página principal
    } else {
        res.render(`login`); //caso não, vai para o login
    };
};

exports.loginPost = (req, res) => {
    userModel.find({ username: req.body.login, password: req.body.password}, `name id`).then((query) => { //busca um usuário com login e senha
        if(query.length === 0) { //caso não exista...
            res.render(`login`); //volta pro login
        } else {
            req.session.user = { name: query[0].name, id: query[0]._id }; //caso sim, salva nome e id na sessão
            res.render(`main`); //e vai pra página principal
        };
    });
};