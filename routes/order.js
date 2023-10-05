var express = require('express');
var router = express.Router();
var orderHandler = require('../controllers/order')
var { authenticateToken } = require('../controllers/auth')

router.get('/:id', authenticateToken, async function (req, res) {
    var result = await orderHandler.getOrderDetails(req, res)
    console.log('result', result)
    res.send(result);
});

router.post('/', authenticateToken, async function (req, res) {
    var result = await orderHandler.createOrder(req, res)
    console.log('result', result)
    res.send(result);
});


module.exports = router;
