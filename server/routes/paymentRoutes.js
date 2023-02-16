const express = require('express');
const router = express.Router();
const { addTransaction } = require('../controller/paymentController');

router.post('/doPayment', addTransaction)

module.exports = router;