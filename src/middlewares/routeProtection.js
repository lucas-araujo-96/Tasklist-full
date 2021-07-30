module.exports = (req, res, next) => { //impede que navegadores não logados tenham acesso a páginas internas, o que pode crashar o servidor

    console.log(req.path);

    if(!req.session.user === undefined) { //checa se o usuário está setado na sessão, caso não esteja, redireciona para a página de login
        const reqPath = req.path;
        const checkPath = (reqPath === `/` || reqPath === `/login` || reqPath === `/createAccount`);
        if(checkPath) return next();
        else res.render(`login`);
    };

};