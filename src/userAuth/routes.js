const express = require('express');
const {
    login,
    createUser
} = require('./controller');

const userAuthRoutes = express.Router();

userAuthRoutes.post('/login',login);
userAuthRoutes.post('/createUser',createUser);

module.exports = {
    userAuthRoutes
}