var UserDetails = require('../models/user')
var { getUniqueID } = require('../utils/utils')

function getUser(req, res) {
    return new Promise((resolve, reject) => {
        const params = req.params;
        UserDetails.findOne({ id: params.id, isActive: 1 }, function (err, user) {
            if (err) {
                resolve({ isSuccess: false, message: "Not able to find the users", error: err })
            } else {
                console.log('data', user)
                if (!user) {
                    resolve({ isSuccess: true, message: "Users details fetched Successfully - No user Found", data: user, length: 0 })
                } else {
                    resolve({ isSuccess: true, message: "Users details fetched Successfully", data: user, length: user.length })
                }
            }
        });
    })
}


function getPopulatedUser(req, res) {
    return new Promise((resolve, reject) => {
        const params = req.params;
        UserDetails.findOne({ id: params.id, isActive: 1 }, function (err, user) {
            if (err) {
                resolve({ isSuccess: false, message: "Not able to find the users", error: err })
            } else {
                console.log('data', user)
                if (!user) {
                    resolve({ isSuccess: true, message: "Users details fetched Successfully - No user Found", data: user, length: 0 })
                } else {
                    resolve({ isSuccess: true, message: "Users details fetched Successfully", data: user, length: user.length })
                }
            }
        });
    })
}

function getUserByPhone(req, res) {
    return new Promise((resolve, reject) => {
        let { phone } = req.body
        console.log('getUserByPhone', phone)
        UserDetails.findOne({ phone: phone, isActive: 1 }, function (err, user) {
            if (err) {
                resolve({ isSuccess: false, message: "Not able to find the users", error: err })
            } else {
                console.log('data', user)
                if (!user) {
                    resolve({ isSuccess: true, message: "Users details fetched Successfully - No user Found", data: user, length: 0 })
                } else {
                    resolve({ isSuccess: true, message: "Users details fetched Successfully", data: user, length: user.length })
                }
            }
        });
    })
}

function getAllUser(req, res) {
    return new Promise((resolve, reject) => {

        //isActive: 1
        UserDetails.find({ isActive: 1 }, function (err, users) {

            if (err) {
                resolve({ isSuccess: false, message: "Not able to find the users", error: err })
            } else {
                console.log('data', users)
                var userMap = {};

                users.forEach(function (user) {
                    return userMap[user.id] = user;
                });

                resolve({ isSuccess: true, message: "All Users details fetched Successfully", data: userMap, length: users.length })
            }

        });
    })
}

function createUser(req, res) {
    return new Promise((resolve, reject) => {
        console.log('createUser Req Body', req.body)
        let { name, phone, email, password, userType = 1 } = req.body
        try {

            UserDetails.countDocuments({}, async function (err, count) {
                console.log('count', count)
                let isPhoneExist = await UserDetails.countDocuments({ phone: phone })
                console.log('isPhoneExist', isPhoneExist)
                if (isPhoneExist == 0) {
                    let id = await getUniqueID("user", count + 1)
                    console.log('ID:', id)
                    let userObj = { id, name, phone, email, password, userType }
                    const user = new UserDetails(userObj);
                    console.log('userObj:', userObj)
                    user.save((err, data) => {
                        if (err) {
                            resolve({ isSuccess: false, message: "", error: err })
                        } else {
                            console.log('data', data)
                            resolve({ isSuccess: true, message: "", data: data })
                        }
                    });
                } else {
                    resolve({ isSuccess: true, message: "User Phone Already Exists, Try Log In", data: "User Already Exists" })
                }
            });



        } catch (error) {
            // throw new error(error)
            console.log('error: createUser', error)
            reject({ isSuccess: false, error: error })
        }
    })
}

function modifyUserProperty(req, res) {
    return new Promise((resolve, reject) => {

        let { id, name, phone, email, userType, cart_id } = req.body

        let userObj = { name, phone, email, userType, cart_id }

        //const User = new User();
        UserDetails.findOneAndUpdate({ id: id, isActive: 1 }, userObj, function (err, user) {
            if (err) {
                resolve({ isSuccess: false, message: "Not able to find the users", error: err })
            } else {
                console.log('data', user)
                resolve({ isSuccess: true, message: "Users details fetched and modified Successfully", data: user })
            }
        });
    })
}

function modifyUser(req, res) {
    return new Promise((resolve, reject) => {

        let { id, name, phone, email, userType, cart_id } = req.body

        let userObj = { name, phone, email, userType, cart_id }

        //  const User = new User();
        UserDetails.findOneAndUpdate({ id: id, isActive: 1 }, userObj, function (err, user) {
            if (err) {
                resolve({ isSuccess: false, message: "Not able to find the users", error: err })
            } else {
                console.log('data', user)
                resolve({ isSuccess: true, message: "Users details fetched and modified Successfully", data: user })
            }
        });
    })
}



function deleteUser(req, res) {
    return new Promise((resolve, reject) => {

        const params = req.params;
        console.log('delete params', params)
        UserDetails.findOneAndUpdate({ id: params.id }, { isActive: 0 }, function (err, user) {
            if (err) {
                resolve({ isSuccess: false, message: "Not able to find the users", error: err })
            } else {
                console.log('data', user)
                resolve({ isSuccess: true, message: "Users Deleted Successfully", data: user })
            }
        });
    })
}

module.exports = { createUser, getUser, getAllUser, modifyUserProperty, modifyUser, deleteUser, getUserByPhone }
