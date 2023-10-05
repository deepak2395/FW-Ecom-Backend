var express = require('express');
var router = express.Router();
var cartHandler = require('../controllers/cart')

router.get('/:id', async function (req, res) {
    var result = await cartHandler.getCartDetails(req, res)
    console.log('result', result)
    res.send(result);
});

router.put('/', async function (req, res) {
    var result = await cartHandler.modifyCart(req, res)
    console.log('result', result)
    res.send(result);
});


module.exports = router;
