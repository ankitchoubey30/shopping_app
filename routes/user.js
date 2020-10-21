const express = require('express');
const Router =  express.Router();
const userController = require('../controller/user')

Router.get('/', userController.getLogin);

Router.post('/postLogin', userController.postLogin);

Router.get('/register', userController.getRegister);

Router.post('/postRegister', userController.postRegister);

Router.post('/postLogout', userController.postLogout);







module.exports = Router;