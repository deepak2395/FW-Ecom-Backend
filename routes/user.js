var express = require('express');
var router = express.Router();
var userHandler = require('../controllers/user')

var { authenticateToken } = require('../controllers/auth')
/* //get query&params in express

//etc. example.com/user/000000?sex=female

app.get('/user/:id', function(req, res) {

  const query = req.query;// query = {sex:"female"}

  const params = req.params; //params = {id:"000000"}

}) */

router.get('/:id', async function (req, res) {
    var result = await userHandler.getUser(req, res)
    console.log('result', result)
    res.send(result);
});

router.post('/find', async function (req, res) {
    var result = await userHandler.getUserByPhone(req, res)
    console.log('result', result)
    res.send(result);
});

router.get('/', authenticateToken, async function (req, res) {
    var result = await userHandler.getAllUser(req, res)
    console.log('result', result)
    res.send(result);
});

router.post('/', async function (req, res) {
    var result = await userHandler.createUser(req, res)
    console.log('result', result)
    res.send(result);
});

router.put('/', async function (req, res) {
    var result = await userHandler.modifyUser(req, res)
    console.log('result', result)
    res.send(result);
});

router.patch('/', async function (req, res) {
    var result = await userHandler.modifyUserProperty(req, res)
    console.log('result', result)
    res.send(result);
});

router.delete('/:id', async function (req, res, next) {
    var result = await userHandler.deleteUser(req, res)
    console.log('result', result)
    res.send(result);
});

module.exports = router;
