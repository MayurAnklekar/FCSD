const express = require('express');
const router = express.Router();
const { addUser, adminLogin} = require('../controller/userControllers');

router.post('/addUser', addUser)
router.post('/admin-login', adminLogin);


module.exports = router;