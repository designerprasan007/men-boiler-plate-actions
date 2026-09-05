const express = require('express');

const user = express.Router();

const{ LoginForm, RegisterForm, forgotPassword, resetPassword } = require('../Controllers/UserController');


user.post('/login', LoginForm);
user.post('/register', RegisterForm);
user.post('/forgot-password', forgotPassword);
user.patch('/resetPassword/:resetPasswordToken', resetPassword)





module.exports = user;