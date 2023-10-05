var User = require('../models/user1')

/* var users = [new User({
    name: "Deepak",
    email: "debugconsole002@gmail.com",
    bio: "",
    image: "https://images.pexels.com/photos/288478/pexels-photo-288478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
})
] */

//console.log('user')

function userSeedStart() {
    for (user of users) {
        user.save(function (err, data) {
            if (err) {
                console.log('err-----------------', err)
            } else {
                console.log('data ------', data)
            }
        })
    }
}

//userSeedStart()

/* User.find(function (err, data) {
    if (err) {
        console.log('err-----------------', err)
    } else {
        console.log('data ------', data)
    }
}) */
