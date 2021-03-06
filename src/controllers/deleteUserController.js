const path = require(`path`); //requisita o módulo path
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`)); //requisita o modelo de usuário
const taskListModel = require(path.join(__dirname, `..`, `models`, `taskListModel`)); //requisita o modelo de taskList
const bcrypt = require(`bcrypt`); //requisita o módulo bcrypt

//rota para a página de confirmação para deletar o usuário
exports.deleteUserGet = (req, res) => {

    return res.render(`deleteUser`, {error: null}); //vai para a página de confirmação
    
}; 

exports.deleteUserPost = async (req, res) => { //rota para deletar o usuário

    const user = await userModel.findOne({_id: req.session.user.id}); //busca o usuário pelo id

    bcrypt.compare(req.body.password, user.password, async (err, result) => { //valida a senha e, caso bata, apaga a conta e a lista de tarefas e desloga o usuário
        if (result) {
            await userModel.deleteOne({_id: req.session.user.id});
            await taskListModel.deleteOne({userID: req.session.user.id});
            return res.redirect(`logoff`);
        } else {
            return res.render(`deleteUser`, {error: `Senha inválida`}); //vai para a página de confirmação
        };
    });

};