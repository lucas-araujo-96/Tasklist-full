const express = require(`express`); //requisita o express
const path = require(`path`); //requisita o módulo path
const router = express.Router(); //instancia o roteador
const loginControl = require(path.join(__dirname, `..`, `controllers`, `loginController`)); //requisita o controller da página de login
const newUserControl = require(path.join(__dirname, `..`, `controllers`, `newUserController`)); //requisita o controller da página de criação de usuário
const mainControl = require(path.join(__dirname, `..`, `controllers`, `mainController`)); //requisita o controlador da página principal
const optionsControl = require(path.join(__dirname, `..`, `controllers`, `userInfoController`)); //requisita o controlador da página de opções da conta
const deletionControl = require(path.join(__dirname, `..`, `controllers`, `deleteUserController`)); //requisita o controlador da página de deletar conta

router.get([`/`, `/login`], loginControl.loginGet); //get que responde a página inicial
router.post(`/login`, loginControl.loginPost); //post de login

router.get(`/createAccount`, newUserControl.newUserGet); //get que responde a página de criação de usuário
router.post(`/createAccount`, newUserControl.newUserPost); //post que cria o novo usuário

router.get(`/accountOptions`, optionsControl.userInfoGet); //get que responde ao link de dados da conta
router.post(`/updateInfo`, optionsControl.updateInfo); //post para atualização de dados do usuário
router.post(`/updatePassword`, optionsControl.updatePassword); //post para atualização de senha

router.get(`/deleteUser`, deletionControl.deleteUserGet); //get que responde a página de apagar conta
router.post(`/deleteUser`, deletionControl.deleteUserPost); //post para apagar conta

router.get(`/main`, mainControl.mainGet); //rota que responde a página principal
router.post(`/main`, mainControl.updateTaskList); //rota de atualização das tasklists
router.get(`/logoff`, mainControl.logoff); //get que responde ao link de logoff

module.exports = router; //exporta o roteador