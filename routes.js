const express = require('express');
const router = express.Router();

const authRoute = require('./src/route/auth');
const insertRoute = require('./src/route/insert');

router.use('/auth', authRoute);
// router.use('/insert', insertRoute);

module.exports = router;