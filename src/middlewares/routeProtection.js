module.exports = (req, res, next) => { //impede que navegadores não logados tenham acesso a páginas internas, o que pode crashar o servidor

    const reqPath = req.path;
    const checkPath = (reqPath === `/` || reqPath === `/login` || reqPath === `/createAccount`); //lista de rotas que pode ser acessadas sem login
    if(!checkPath && req.session.user === undefined) { //verifica se a requisição está indo para uma rota interna sem se logar
        
        return res.redirect(`login`); //caso esteja, volta pro login
         
    };
        
    next();
};