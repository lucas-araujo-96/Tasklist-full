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

    const {name, email, username} = req.body; //pega os dados enviados
    
    //checa as validações, caso alguma dê problemas, volta a página, caso contrário, atualiza as informações do usuário
    if (!Form.validateName(name)) return res.render(`accountOptions`, {error: `Informação de nome inválida`, username: user.username, name: user.name, email: user.email}); //validação do novo nome

    if (!await Form.validateNewEmail(user.id, email)) return res.render(`accountOptions`, {error: `E-mail inválido ou já em uso`, username: user.username, name: user.name, email: user.email}); //validação do novo email

    if (!await Form.validateNewUsername(user.id, username)) return res.render(`accountOptions`, {error: `Nome de usuário inválido ou já em uso`, username: user.username, name: user.name, email: user.email}); //validação do novo username
        
    user.name = name;
    user.email = email;
    user.username = username;
    await user.save();
    return res.render(`accountOptions`, {error: `Dados atualizados`, username: user.username, name: user.name, email: user.email});

};

exports.updatePassword = async (req, res) => { //função para atualização de senhas

    const user = await userModel.findOne({_id: req.session.user.id}); //dados atuais do usuário

    const { currPassword, newPassword, confNewPassword } = req.body; //pega os dados novos enviados

    //checa as senhas e, caso sejam válidas, atualiza
    if (!Form.validatePassword(newPassword, confNewPassword)) return res.render(`accountOptions`, {error: `Senha nova inválida ou não confere.`, username: user.username, name: user.name, email: user.email}); //validação da nova senha

    if (!await bcrypt.compare(currPassword, user.password)) return res.render(`accountOptions`, {error: `Senha atual incorreta`, username: user.username, name: user.name, email: user.email});
    
    bcrypt.hash(newPassword, 10, async (err, hash) => {
        user.password = hash;
        await user.save();
        return res.render(`accountOptions`, {error: `Senha atualizada`, username: user.username, name: user.name, email: user.email});
    });

};
