var Cart = require('../models/cart')

var carts = [new Cart({
    id: 1,
    user: '63b434aa00269effacf71600',
    cart: ['crackers'],
})
]



//console.log('cart')

function userSeedStart() {
    for (cart of carts) {
        cart.save(function (err, data) {
            if (err) {
                console.log('err-----------------', err)
            } else {
                console.log('data ------', data)
            }
        })
    }
}

//userSeedStart()


/* Cart
    .findOne({ id: 1 })
    .populate("user") // key to populate
    .then(user => {
     //   console.log('cart+user---', user);
    }); */