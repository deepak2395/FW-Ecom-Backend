const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var Schema = mongoose.Schema

const { createHash } = require('crypto');
const hash = createHash('sha256');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        minLength: 10,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Phone is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password musn\'t contain password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    userType: {
        type: String,
        required: true
    },
    isActive: { type: Number, default: 1 },
    cart_id: { type: Schema.Types.ObjectId, ref: 'Cart' },
    order_id: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
}, {
    timestamps: true
})

//Generate auth token
userSchema.statics.generateAuthToken = function (email, password) {
    return new Promise(async (resolve, reject) => {
        const user = this

        let jwtsectret = process.env.JWT_SECRET
        let data = { email: email }
        const token = jwt.sign(data, jwtsectret)
        console.log('jwtsectret', jwtsectret, data, token)
        /*  user.tokens = user.tokens.push(token)
         await user.save() */
        resolve(token)
    })
}

//login in users
userSchema.statics.findByCredentials = (email, password) => {
    const ref = this
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({ email })
        if (!user) {
            console.log('user not found')
            resolve({ isSuccess: false, message: "Not able to find the users", error: "Not able to find the users" })
        }
        //  const isMatch = await bcrypt.compare(await bcrypt.hash(password, 8), user.password)

        hash.update(password)

        console.log('before hash', password)
        const isMatch = await hash.digest('hex')

        console.log(isMatch)
        if (user.password != isMatch) {
            // console.log('password not found', await bcrypt.hash(password, 8))
            resolve({ isSuccess: false, message: "Password is wrong", error: "Password is wrong" })
        }
        console.log('user', user)

        //console.log('user token', mongoose.model('User').generateAuthToken())
        let token = await mongoose.model('User').generateAuthToken(email, password)
        resolve({ isSuccess: true, message: "Password or Email is wrong", data: token })
    })
}

userSchema.statics.findByCredentials = (email, password) => {
    const ref = this
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({ email })
        if (!user) {
            console.log('user not found')
            resolve({ isSuccess: false, message: "Not able to find the users, signUp to continue", error: "Not able to find the users, signUp to continue" })
        }
        //  const isMatch = await bcrypt.compare(await bcrypt.hash(password, 8), user.password)

        hash.update(password)

        console.log('before hash', password)
        const isMatch = await hash.digest('hex')

        console.log(isMatch)
        if (user.password != isMatch) {
            // console.log('password not found', await bcrypt.hash(password, 8))
            resolve({ isSuccess: false, message: "Password is wrong", error: "Password is wrong" })
        }
        console.log('user', user)

        //console.log('user token', mongoose.model('User').generateAuthToken())
        let token = await mongoose.model('User').generateAuthToken(email, password)
        resolve({ isSuccess: true, message: "Login Successfull", data: token })
    })
}

//Hash plain password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {

        hash.update(user.password)

        console.log('before hash', user.password)
        user.password = await hash.digest('hex')

        console.log('After hash', user.password)

        // user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User