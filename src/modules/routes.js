const express = require(`express`);
const path = require(`path`);
const router = express.Router();
const loginControl = require(path.join(__dirname, `..`, `controllers`, `loginController`));
const newUserControl = require(path.join(__dirname, `..`, `controllers`, `newUserController`));

router.get([`/`, `/login`], loginControl.loginGet);

router.get(`/createAccount`, newUserControl.newUserGet);

module.exports = router;