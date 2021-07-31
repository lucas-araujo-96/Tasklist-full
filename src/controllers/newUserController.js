const path = require(`path`); //requisita o módulo path
const bcrypt = require(`bcrypt`); //requisita o módulo bcrypt
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`)); //requisita o modelo de usuário do BD
const Form = require(path.join(__dirname, `..`, `modules`, `Form`)); //requisita a classe Form

exports.newUserGet = (req, res) => { //responde a página de criação de usuário a um GET

    res.render(`createAccount`, {error: null}); //renderiza a criação de conta

};

exports.newUserPost = async (req, res) => { //criação de usuário
    const email = req.body.email; //email
    const username = req.body.login; //username
    const name = req.body.name; //nome
    const password = req.body.password; //senha
    const confPassword = req.body.confirmPassword; //confirmação de senha
    
    const chkEmail = await Form.validateEmail(email); //validação de email
    const chkUsername = await Form.validateUsername(username); //validação de nome de usuário
    const chkName = await Form.validateName(name); //validação de nome
    const chkPassword = await Form.validatePassword(password, confPassword); //validação de senha
    
    //faz as checagens, caso alguma das validações apresente problemas, volta para a mesma página, caso contrário, cria o usuário e o retorna para o login
    if(!chkEmail || !chkUsername || !chkName || !chkPassword) res.render(`createAccount`, {error: `Dados inválidos, favor verificar novamente`});
    else {
        bcrypt.hash(password, 10, (err, hash) => {
            userModel.create({
                name: name,
                username: username,
                password: hash,
                email: email,
            });
            if(req.body.user) req.body.user = undefined;
            
            res.render(`login`, {error: `Conta criada`});
        });
    };

};