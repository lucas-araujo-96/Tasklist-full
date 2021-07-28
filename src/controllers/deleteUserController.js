const path = require(`path`); //requisita o módulo path
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`)); //requisita o modelo de usuário

exports.deleteUserGet = (req, res) => { //rota para a página de confirmação para deletar o usuário
    res.render(`deleteUser`);
};

exports.deleteUserPost = async (req, res) => { //rota para deletar o usuário
    const user = await userModel.findOne({password: req.body.password, _id: req.session.user.id}); //confirma a senha
    if (!user) res.render(`deleteUser`); //se a senha estiver errada, volta, caso esteja certa, deleta o usuário e desloga
    else {
        await userModel.deleteOne({_id: req.session.user.id});
        res.redirect(`logoff`);
    };
};