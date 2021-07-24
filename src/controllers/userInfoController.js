const path = require(`path`);
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`));
const Form = require(path.join(__dirname, `..`, `modules`, `Form`));

exports.userInfoGet = async (req, res) => {
    const user = await await userModel.findOne({_id: req.session.user.id});
    res.render(`accountOptions`, user);
};

exports.updateInfo = async (req, res) => {
    const user = await userModel.findOne({_id: req.session.user.id});
    const newName = req.body.name;
    const chkName = await Form.validateName(newName);
    const newEmail = req.body.email;
    const chkEmail = await Form.validateNewEmail(user.id, newEmail);
    const newUsername = req.body.username;
    const chkUsername = await Form.validateNewUsername(user.id, newUsername);

    if (!chkName) res.render(`accountOptions`, user);
    else if (!chkEmail) res.render(`accountOptions`, user);
    else if (!chkUsername) res.render(`accountOptions`, user);
    else {
        user.name = newName;
        user.email = newEmail;
        user.username = newUsername;
        await user.save();
        res.render(`accountOptions`, user);
    };
};

exports.updatePassword = async (req, res) => {
    const user = await userModel.findOne({_id: req.session.user.id});
    const currentPassword = req.body.currPassword;
    const password = req.body.newPassword;
    const confPassword = req.body.confNewPassword;
    const chkPassword = Form.validatePassword(password, confPassword);
    if (!chkPassword || currentPassword !== user.password) res.render(`accountOptions`, user);
    else {
        user.password = password;
        await user.save();
        res.render(`accountOptions`, user);
    };
};