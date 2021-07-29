const path = require(`path`); //requisita o módulo path
const bcrypt = require(`bcrypt`); //requisita o módulo bcrypt
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`)); //requisita o modelo de usuário

exports.loginGet = async (req, res) => { //responde a página de login a um GET
    if(req.session.user) { //caso exista uma sessão logada...
        res.redirect(`/main`); //vai pra página principal
    } else {
        res.render(`login`); //caso não, vai para o login
    };
};

exports.loginPost = async (req, res) => {
    const login = req.body.login; //username digitado
    const password = req.body.password; //senha digitada

    const user = await userModel.findOne({username: login}); //busca o registro pelo username
    
    if(user === null) { //volta a página caso o usuário não exista
        res.render(`login`);
        return;
    };  

    bcrypt.compare(password, user.password, (err, result) => { //compara a senha digitada com o hash no registro
        if(result) { //caso valide
            req.session.user = {id: user._id}; //define o id na sessão
            res.redirect(`/main`); //e vai para a página principal
        } else { //caso não
            res.render(`login`); //volta para o login
        };
    });
};