const path = require(`path`);
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`));

exports.loginGet = (req, res) => { //responde a página de login a um GET
    res.render(`login`);
};

exports.loginPost = (req, res) => {
    userModel.find({ username: req.body.login, password: req.body.password}, `name username`).then((query) => {
        if(query.length === 0) {
            res.render(`login`);
        } else {
            res.render(`main`);
        };
    });
};