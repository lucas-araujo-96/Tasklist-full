const path = require(`path`); //requisita o módulo path
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`)); //requisita o modelo de usuário
const taskListModel = require(path.join(__dirname, `..`, `models`, `taskListModel`)); //requisita o modelo de taskList
const bcrypt = require(`bcrypt`); //requisita o módulo bcrypt

exports.deleteUserGet = (req, res) => { //rota para a página de confirmação para deletar o usuário

    res.render(`deleteUser`); //vai para a página de confirmação
    
    return;
};

exports.deleteUserPost = async (req, res) => { //rota para deletar o usuário

    const user = await userModel.findOne({_id: req.session.user.id}); //busca o usuário pelo id

    bcrypt.compare(req.body.password, user.password, async (err, result) => { //valida a senha e, caso bata, apaga a conta e desloga o usuário
        if (result) {
            await userModel.deleteOne({_id: req.session.user.id});
            await taskListModel.deleteOne({userID: req.session.user.id});
            res.redirect(`logoff`);
        };
    });

    return;
};