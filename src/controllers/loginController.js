const path = require(`path`); //requisita o módulo path
const bcrypt = require(`bcrypt`); //requisita o módulo bcrypt
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`)); //requisita o modelo de usuário

exports.loginGet = async (req, res) => { //responde a página de login a um GET

    if(req.session.user) { //caso exista uma sessão logada...
        return res.redirect(`/main`); //vai pra página principal;
    };

    return res.render(`login`, {error: null}); //carregamento normal, sem erro
};

exports.loginPost = async (req, res) => {

    const login = req.body.login; //username digitado
    
    const user = await userModel.findOne({username: login}); //busca o registro pelo username
    
    //caso não exista um usuário com o username digitado, volta a tela com a mensagem de erro
    if (user === null)  return res.render(`login`, {error: `Este usuário não existe.`});

    const password = req.body.password; //senha digitada
        
    if (bcrypt.compare(password, user.password)) { //compara a senha digitada com o hash
        req.session.user = {id: user._id, name: user.name}; //seta o nome do usuário e o id na sessão
        return res.redirect(`/main`); //e prossegue pro main
    } else {
        return res.render(`login`, {error: `Senha inválida`}); //ou retorna pro login com a mensagem de erro
    };

};
