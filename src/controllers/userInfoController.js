const path = require(`path`); //requisita o módulo path
const bcrypt = require(`bcrypt`); //requisita o módulo bcrypt
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`)); //requisita o modelo de usuário
const Form = require(path.join(__dirname, `..`, `modules`, `Form`)); //requisita o módulo Form

exports.userInfoGet = async (req, res) => { //abre a página de dados da conta com as informações do usuário

    const user = await userModel.findOne({_id: req.session.user.id});
    
    res.render(`accountOptions`, {error: null, username: user.username, name: user.name, email: user.email});
    
};

exports.updateInfo = async (req, res) => {  //função para atualização de dados

    const user = await userModel.findOne({_id: req.session.user.id}); //dados atuais do usuário

    const newName = req.body.name; //novo nome
    const newEmail = req.body.email; //novo email
    const newUsername = req.body.username; //novo username
    
    //checa as validações, caso alguma dê problemas, volta a página, caso contrário, atualiza as informações do usuário
    if (!Form.validateName(newName)) return res.render(`accountOptions`, {error: `Informação de nome inválida`, username: user.username, name: user.name, email: user.email}); //validação do novo nome

    if (!await Form.validateNewEmail(user.id, newEmail)) return res.render(`accountOptions`, {error: `E-mail inválido ou já em uso`, username: user.username, name: user.name, email: user.email}); //validação do novo email

    if (!await Form.validateNewUsername(user.id, newUsername)) return res.render(`accountOptions`, {error: `Nome de usuário inválido ou já em uso`, username: user.username, name: user.name, email: user.email}); //validação do novo username
        
    user.name = newName;
    user.email = newEmail;
    user.username = newUsername;
    await user.save();
    return res.render(`accountOptions`, {error: `Dados atualizados`, username: user.username, name: user.name, email: user.email});

};

exports.updatePassword = async (req, res) => { //função para atualização de senhas

    const user = await userModel.findOne({_id: req.session.user.id}); //dados atuais do usuário

    const currentPassword = req.body.currPassword; //senha atual
    const password = req.body.newPassword; //nova senha
    const confPassword = req.body.confNewPassword; //confirmação da nova senha

    //checa as senhas e, caso sejam válidas, atualiza
    if (!Form.validatePassword(password, confPassword)) return res.render(`accountOptions`, {error: `Senha nova inválida ou não confere.`, username: user.username, name: user.name, email: user.email}); //validação da nova senha

    if (!await bcrypt.compare(currentPassword, user.password)) return res.render(`accountOptions`, {error: `Senha atual incorreta`, username: user.username, name: user.name, email: user.email});
    
    bcrypt.hash(password, 10, async (err, hash) => {
        user.password = hash;
        await user.save();
        return res.render(`accountOptions`, {error: `Senha atualizada`, username: user.username, name: user.name, email: user.email});
    });

};