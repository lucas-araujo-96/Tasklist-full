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
    userModel.find( {$or: [{ username: login}, { email: email}]}).then((query) => {
        if(query.length === 0) {
             userModel.create({ //cria a entrada no BD
                name: realName,
                username: login,
                password: password,
                email: email,
            }).then(() => {
                console.log(`User creation success`);
                res.send(`Usuário criado`);
            }).catch((e) => {
                console.log(`MongoDB model creation error: ${e}`);
            });
        } else {
            console.log(`Login or email already exists on userbase`);
            res.render(`createAccount`);
        };
    });
};