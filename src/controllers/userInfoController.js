const path = require(`path`); //requisita o módulo path
const bcrypt = require(`bcrypt`); //requisita o módulo bcrypt
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`)); //requisita o modelo de usuário
const Form = require(path.join(__dirname, `..`, `modules`, `Form`)); //requisita o módulo Form

exports.userInfoGet = async (req, res) => { //abre a página de dados da conta com as informações do usuário

    const user = await userModel.findOne({_id: req.session.user.id});
    res.render(`accountOptions`, user);
    
    return;
};

exports.updateInfo = async (req, res) => {  //função para atualização de dados

    const user = await userModel.findOne({_id: req.session.user.id}); //dados atuais do usuário

    const newName = req.body.name; //novo nome
    const newEmail = req.body.email; //novo email
    const newUsername = req.body.username; //novo username
    
    const chkName = await Form.validateName(newName); //validação do novo nome
    const chkEmail = await Form.validateNewEmail(user.id, newEmail); //validação do novo email
    const chkUsername = await Form.validateNewUsername(user.id, newUsername); //validação do novo username

    //checa as validações, caso alguma dê problemas, volta a página, caso contrário, atualiza as informações do usuário
    if (!chkName || !chkEmail || !chkUsername) res.render(`accountOptions`, user);
    else { 
        user.name = newName;
        user.email = newEmail;
        user.username = newUsername;
        await user.save();
        res.render(`accountOptions`, user);
    };

    return;
};

exports.updatePassword = async (req, res) => { //função para atualização de senhas

    const user = await userModel.findOne({_id: req.session.user.id}); //dados atuais do usuário

    const currentPassword = req.body.currPassword; //senha atual
    const password = req.body.newPassword; //nova senha
    const confPassword = req.body.confNewPassword; //confirmação da nova senha
    const chkPassword = Form.validatePassword(password, confPassword); //validação da nova senha

    //checa as senhas e, caso sejam válidas, atualiza
    if (!chkPassword) res.render(`accountOptions`, user);
    else {
        bcrypt.compare(currentPassword, user.password, async (err, result) => {
            if(result) {
                bcrypt.hash(password, 10, async (err, hash) => {
                    user.password = hash;
                    await user.save();
                    res.redirect(`/main`);
                });
            } else {
                res.render(`accountOptions`, user);
            };
        });
    };

    return;
};