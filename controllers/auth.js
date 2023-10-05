const jwt = require('jsonwebtoken');

const { createHash } = require('crypto');


var UserDetails = require('../models/user')


function generateAccessToken(email, password) {
    return new Promise(async (resolve, reject) => {
        const user = await UserDetails.findOne({ email })
        if (!user) {
            console.log('user not found')
            resolve({ isSuccess: false, message: "Not able to find the users, signUp to continue", error: "Not able to find the users, signUp to continue" })
        }
        const hash = createHash('sha256');
        hash.update(password)

        const hashPassword = await hash.digest('hex')

        console.log(hashPassword)
        if (user.password != hashPassword) {
            resolve({ isSuccess: false, message: "Password is wrong", error: "Password is wrong" })
        }
        console.log('user', user)

        //console.log('user token', mongoose.model('User').generateAuthToken())
        let token = jwt.sign({ email, userId: user.id, user_id: user._id }, process.env.JWT_SECRET, { expiresIn: '60s' });
        resolve({ isSuccess: true, message: "Login Successfull", data: token })
    })

}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    console.log('verify', process.env.JWT_SECRET, token)
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)
        console.log('decode user', user)
        let { userId, user_id } = user
        req.user = {}
        req.user.id = userId
        req.user._id = user_id
        console.log('user:', user)
        next()
    })
}


function userLogin(req, res) {
    return new Promise(async (resolve, reject) => {
        let { email, password } = req.body

        let loginRes = await generateAccessToken(email, password)
        resolve(loginRes)
        // resolve(UserDetails.findByCredentials(email, password))
    })

}

function userLogout(req, res) {

}

module.exports = { userLogin, userLogout, generateAccessToken, authenticateToken }
