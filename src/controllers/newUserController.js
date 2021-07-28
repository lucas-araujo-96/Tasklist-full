const path = require(`path`); //requisita o módulo path
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`)); //requisita o modelo de usuário do BD
const Form = require(path.join(__dirname, `..`, `modules`, `Form`)); //requisita a classe Form

exports.newUserGet = (req, res) => { //responde a página de criação de usuário a um GET
    res.render(`createAccount`);
};

exports.newUserPost = async (req, res) => { //criação de usuário
    const email = req.body.email; //email
    const chkEmail = await Form.validateEmail(email); //validação de email
    const username = req.body.username; //username
    const chkUsername = await Form.validateUsername(username); //validação de nome de usuário
    const name = req.body.name; //nome
    const chkName = await Form.validateName(name); //validação de nome
    const password = req.body.password; //senha
    const confPassword = req.body.confirmPassword; //confirmação de senha
    const chkPassword = await Form.validatePassword(password, confPassword); //validação de senha

    //faz as checagens, caso alguma das validações apresente problemas, volta para a mesma página, caso contrário, cria o usuário e o retorna para o login
    if(!chkEmail) res.render(`createAccount`);
    else if(!chkUsername) res.render(`createAccount`);
    else if(!chkName) res.render(`createAccount`);
    else if(!chkPassword) res.render(`createAccount`);
    else {
        await userModel.create({
            name: name,
            username: username,
            password: password,
            email: email,
        });
        res.render(`login`);
    };
};