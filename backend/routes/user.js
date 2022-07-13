//* import express
const express = require('express');

//* creation of the router
const router = express.Router();

//* import the middleware ratelimiter for limit call api number and the password checker
const callCtrl = require('../middleware/ratelimiter');
const pwdCtrl = require('../middleware/password');

//* import the business logic for user management
const userCtrl = require('../controllers/user');

// * define the routes for each API endpoint
router.post('/signup',callCtrl, pwdCtrl, userCtrl.signup);
router.post('/login',callCtrl, userCtrl.login);

// * export the router
module.exports = router;