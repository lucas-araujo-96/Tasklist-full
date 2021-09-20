const path = require(`path`); //requisita o módulo path
const bcrypt = require(`bcrypt`); //requisita o módulo bcrypt
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`)); //requisita o modelo de usuário do BD
const Form = require(path.join(__dirname, `..`, `modules`, `Form`)); //requisita a classe Form

exports.newUserGet = (req, res) => { //responde a página de criação de usuário a um GET

    res.render(`createAccount`, {error: null}); //renderiza a criação de conta

};

exports.newUserPost = async (req, res) => { //criação de usuário

    const { email, login, name, password, confirmPassword } = req.body; //pega os dados do body
    
    //faz as checagens, caso alguma das validações apresente problemas, volta para a mesma página, caso contrário, cria o usuário e o retorna para o login
    if (!await Form.validateEmail(email)) return res.render(`createAccount`, {error: `E-mail inválido ou já em uso.`}); //validação de email

    if (!await Form.validateUsername(login)) return res.render(`createAccount`, {error: `Nome de usuário inválido ou já em uso.`}); //validação de nome de usuário

    if (!Form.validateName(name)) return res.render(`createAccount`, {error: `Informação de nome inválida.`}); //validação de nome

    if (!Form.validatePassword(password, confirmPassword)) return res.render(`createAccount`, {error: `Senha inválida, deve conter ao menos 6 caracteres e os dois campos devem estar iguais.`}); //validação de senha
        
    //encripta a senha e cria o usuário com a hash
    bcrypt.hash(password, 10, async (err, hash) => {
        await userModel.create({
            name: name,
            username: login,
            password: hash,
            email: email,
        });
        if(req.body.user) req.body.user = undefined;
        res.render(`login`, {error: `Conta criada`});
    });

};