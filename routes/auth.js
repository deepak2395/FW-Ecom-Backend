var express = require('express');
var router = express.Router();
var authHandler = require('../controllers/auth')

router.post('/login', async function (req, res, next) {
    var result = await authHandler.userLogin(req, res)
    console.log('result', result)
    res.send(result);
});

router.get('/logout', async function (req, res, next) {
    var result = await authHandler.userLogout(req, res)
    console.log('result', result)
    res.send(result);
});

module.exports = router;