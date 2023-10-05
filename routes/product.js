var express = require('express');
var router = express.Router();
var productHandler = require('../controllers/product')

router.get('/:id', async function (req, res) {
    var result = await productHandler.getProduct(req, res)
    console.log('result', result)
    res.send(result);
});

router.get('/', async function (req, res) {
    var result = await productHandler.getAllProduct(req, res)
    console.log('result', result)
    res.send(result);
});

router.post('/', async function (req, res) {
    var result = await productHandler.createProduct(req, res)
    console.log('result', result)
    res.send(result);
});

router.put('/', async function (req, res) {
    var result = await productHandler.modifyProduct(req, res)
    console.log('result', result)
    res.send(result);
});

router.patch('/', async function (req, res) {
    var result = await productHandler.modifyProductProperty(req, res)
    console.log('result', result)
    res.send(result);
});

router.delete('/:id', async function (req, res, next) {
    var result = await productHandler.deleteProduct(req, res)
    console.log('result', result)
    res.send(result);
});

module.exports = router;
