const path = require(`path`); //requisita o módulo path
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`)); //requisita o modelo de usuário do BD

exports.newUserGet = (req, res) => { //responde a página de criação de usuário a um GET
    res.render(`createAccount`);
};

exports.newUserPost = (req, res) => { //recebe os dados do formulário via post
    const realName = req.body.realName;
    const email = req.body.email;
    const login = req.body.login;
    const password = req.body.password;
    const confPassword = req.body.confirmPassword;
    const loginCheck = (login.length > 4 && login.trim() !== ``); //checa a validade do login
    const passwordCheck = (password === confPassword && password.trim() !== `` && password.length >= 7); //checa a validade da senha

    if(loginCheck && passwordCheck) { //caso estejam válidos, 
        userModel.create({ //cria a entrada no BD
            name: realName,
            username: login,
            password: password,
            email: email,
        });
        console.log(`User creation success`);
        return;
    } else { //caso não
        console.log(`User creation error`);
        res.render(`createAccount`); //volta à página
    };
};