exports.logoff = (req, res) => { //para o link de logoff
    req.session.user = undefined; //"desdefine" o cookie do usuário
    res.render(`login`); //volta pra página de login
};

exports.updateTaskList = (req, res) => {
    console.log(req.body);
    res.end();
};