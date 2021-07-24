const path = require(`path`);
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`));
const mainControl = require(path.join(__dirname, `mainController`));

exports.deleteUserGet = (req, res) => {
    res.render(`deleteUser`);
};

exports.deleteUserPost = async (req, res) => {
    const user = await userModel.findOne({password: req.body.password, _id: req.session.user.id});
    if (!user) res.render(`deleteUser`);
    else {
        await userModel.deleteOne({_id: req.session.user.id});
        res.redirect(`/logoff`);
    };
};