const express = require('express');
const router = express.Router();
const { getFruitPrices, getFruitDetails, updateFruit, addFruit, getDetailsById} = require('../controller/fruitControllers');

router.get('/getDetailsById/:id', getDetailsById);
router.get('/fetchDetails', getFruitDetails)
router.get('/fetchPrices', getFruitPrices)
router.post('/addFruit', addFruit)
router.put('/update/:id', updateFruit)

module.exports = router;