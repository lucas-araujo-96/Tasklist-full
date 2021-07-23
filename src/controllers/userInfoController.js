const path = require(`path`);
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`));

exports.userInfoGet = (req, res) => {
    userModel.findOne({ _id: req.session.user.id }).then((user) => {
        res.render(`accountOptions`, {
            name: user.name,
            email: user.email,
            username: user.username,
        });
    }); 
};

exports.updateInfo = async (req, res) => {
    const newName = req.body.name;
    const newEmail = req.body.email;
    const newUsername = req.body.username;
    let user = await userModel.findOne({ _id: req.session.user.id });
    user.name = newName;
    user.email = newEmail;
    user.username = newUsername;
    await user.save();
    res.render(`main`);
};