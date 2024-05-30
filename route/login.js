const express = require('express');
const loginUserConroller = require('../controller/loginController');

const loginRouter = express.Router();

loginRouter.route('/').post(loginUserConroller);

module.exports = loginRouter;
