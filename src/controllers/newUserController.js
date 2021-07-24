const path = require(`path`); //requisita o módulo path
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`)); //requisita o modelo de usuário do BD
const Form = require(path.join(__dirname, `..`, `modules`, `Form`)); //requisita a classe Form

exports.newUserGet = (req, res) => { //responde a página de criação de usuário a um GET
    res.render(`createAccount`);
};

exports.newUserPost = async (req, res) => {
    const email = req.body.email;
    const chkEmail = await Form.validateEmail(email);
    const username = req.body.username;
    const chkUsername = await Form.validateUsername(username);
    const name = req.body.name; 
    const chkName = await Form.validateName(name);
    const password = req.body.password;
    const confPassword = req.body.confirmPassword;
    const chkPassword = await Form.validatePassword(password, confPassword);

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