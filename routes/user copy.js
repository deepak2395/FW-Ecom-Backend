

var express = require('express');
var router = express.Router();


const User = require('../models/user1')

//const Auth = require('../middleware/auth')



router.get('/', async (req, res) => {
    try {
        console.log('-----------user')
        await User.findOne({}, function (err, data) {
            console.log('-----------data', data)
            if (err) {
                res.send(null);
            } else {
                res.send(data);
            }
        });
    } catch (error) {
        console.log('-----------error', error)
        res.send(error)
    }

})

//signup
router.post('/', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

//login

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

//logout
router.post('/logout', async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//Logout All 
router.post('/logoutAll', async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})
module.exports = router