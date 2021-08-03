const path = require(`path`); //requisita o módulo path
const bcrypt = require(`bcrypt`); //requisita o módulo bcrypt
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`)); //requisita o modelo de usuário

exports.loginGet = async (req, res) => { //responde a página de login a um GET

    if(req.session.user) { //caso exista uma sessão logada...
        res.redirect(`/main`); //vai pra página principal
        return;
    };

    res.render(`login`, {error: null}); //carregamento normal, sem erro
};

exports.loginPost = async (req, res) => {

    const login = req.body.login; //username digitado
    const password = req.body.password; //senha digitada

    const user = await userModel.findOne({username: login}); //busca o registro pelo username
    
    if (user === null) { //caso não exista um usuário com o username digitado, volta a tela com a mensagem de erro
        res.render(`login`, {error: `Este usuário não existe.`});
        return;
    };
        
    bcrypt.compare(password, user.password, (err, result) => { //compara a senha digitada com o hash
        if(result) {
            req.session.user = {id: user._id, name: user.name}; //seta o nome do usuário e o id na sessão
            res.redirect(`/main`); //e prossegue pro main
        } else {
            res.render(`login`, {error: `Senha inválida`}); //ou retorna pro login com a mensagem de erro
        };
    });
};
