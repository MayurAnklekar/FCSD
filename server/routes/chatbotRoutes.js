const express = require('express');
const router = express.Router();
const {  sendMessagetoServer } = require('../controller/chatsController');

//router.get("/senduser", sendMessagetoUser)
router.post("/send", sendMessagetoServer)


module.exports = router;