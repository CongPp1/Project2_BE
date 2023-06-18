const express = require('express');
const authController = require('../controller/auth-controller.js');
const router = express.Router();

router.post('/signUp', authController.register);
router.get('/logIn', authController.login);

module.exports = router;