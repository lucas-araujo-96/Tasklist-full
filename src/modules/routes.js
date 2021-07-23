const express = require(`express`); //requisita o express
const path = require(`path`); //requisita o módulo path
const router = express.Router(); //instancia o roteador
const loginControl = require(path.join(__dirname, `..`, `controllers`, `loginController`)); //requisita o controller da página de login
const newUserControl = require(path.join(__dirname, `..`, `controllers`, `newUserController`)); //requisita o controller da página de criação de usuário
const mainControl = require(path.join(__dirname, `..`, `controllers`, `mainController`));

router.get([`/`, `/login`], loginControl.loginGet); //get que responde a página inicial
router.post(`/`, loginControl.loginPost);

router.get(`/createAccount`, newUserControl.newUserGet); //get que responde a página de criação de usuário
router.post(`/createAccount`, newUserControl.newUserPost); //post que cria o novo usuário

router.get(`/logoff`, mainControl.logoff); //get que responde ao link de logoff

module.exports = router; //exporta o roteador