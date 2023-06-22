const express = require('express');
const router = express.Router();
const insertController = require('../controller/insert-controller.js');

router.post('/', insertController.insert);

module.exports = router;
