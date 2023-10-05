var Carts = require('../models/cart')
var User = require('../models/cart')
var { getUniqueID } = require('../helpers/utils')

var { getProduct } = require('../controllers/product')

function getCartDetails(req, res) {
    return new Promise((resolve, reject) => {
        const params = req.params;
        Carts.findOne({ user_id: params.id }, function (err, cart) {
            if (err) {
                resolve({ isSuccess: false, message: "Not able to find the Cart Details", error: err })
            } else {
                console.log('data', cart)
                if (!cart) {
                    resolve({ isSuccess: true, message: "Carts details fetched Successfully - No item Found", data: cart, length: 0 })
                } else {
                    resolve({ isSuccess: true, message: "Carts details fetched Successfully", data: cart, length: cart.length })
                }
            }
        });
    })
}

function modifyCart(req, res) {
    return new Promise(async (resolve, reject) => {
        console.log('modifyCart Req Body', req.body)
        let { user_id, items } = req.body


        let cartObj = {}
        /*   cartObj.bill = await generateBill(items)
          //  cartObj.items = JSON.stringify(items)
          cartObj.user_id = user_id */
        console.log('updatedItems', items)

        try {

            Carts.countDocuments({}, async function (err, count) {
                console.log('count', count)
                let isCartExist = await Carts.countDocuments({ user_id })
                console.log('isCartExist', isCartExist)




                /*    if (isCartExist == 0) {
                       console.log('isCartExist : 0')
                       let id = await getUniqueID("cart", count + 1)
                       console.log('ID:', id)
                       cartObj.id = id
                       // cartObj.bill = 0
                   } */

                if (isCartExist == 0) {
                    console.log('isCartExist : 0')
                    let id = await getUniqueID("cart", count + 1)
                    console.log('ID:', id)
                    cartObj.id = id
                    cartObj.user_id = user_id
                    cartObj.bill = await generateBill(items)
                    cartObj.items = items
                    const cart = new Carts(cartObj);
                    cart.save({ cartObj }, function (err, cart) {
                        if (err) {
                            resolve({ isSuccess: false, message: "", error: err })
                        } else {
                            console.log('data', cart)

                            User.updateOne({ user_id }, { cart_id: cart._id }, { upsert: true }, function (err, user) {
                                if (err) {
                                    resolve({ isSuccess: false, message: "", error: err })
                                } else {
                                    console.log('user updated with cart Data', user)
                                }
                            })

                            resolve({ isSuccess: true, message: "", data: cart })
                        }
                    });
                } else {
                    cartObj.bill = await generateBill(items)
                    cartObj.items = items
                    console.log('isCartExist : 1', cartObj)
                    Carts.updateOne({ user_id }, { $set: { items: items, bill: cartObj.bill } }, function (err, cart) {
                        if (err) {
                            resolve({ isSuccess: false, message: "", error: err })
                        } else {
                            console.log('isCartExist 1 Data', cart)
                            resolve({ isSuccess: true, message: "", data: cart })
                        }
                    })
                    /*   Carts.findOneAndUpdate({ user_id }, { cartObj }, { upsert: true }, function (err, cart) {
                          if (err) {
                              resolve({ isSuccess: false, message: "", error: err })
                          } else {
                              console.log('isCartExist 1 Data', cart)
                              //   items.map(dataObj => {
                              //       Carts.updateOne(
                              //           { user_id },
                              //           { $push: { items: dataObj } }, function (err, cart) {
                              //               if (err) {
                              //                   console.log('isCartExist 1 failed----------', err)
                              //                   // resolve({ isSuccess: false, message: "", error: err })
                              //               } else {
                              //                   console.log('isCartExist 1 Data----------', cart)
                              //                   // resolve({ isSuccess: true, message: "", data: cart })
                              //               }
                              //           }
                              //       )
                              //   });
                              resolve({ isSuccess: true, message: "", data: cart })
                          }
                      }); */
                }



            });



        } catch (error) {
            // throw new error(error)
            console.log('error: createUser', error)
            reject({ isSuccess: false, error: error })
        }
    })
}

function generateBill(items) {
    return new Promise(async (resolve, reject) => {
        let bill = 0
        for (let i = 0; i < items.length; i++) {
            let req = { params: { id: items[i].item_id } }
            let result = await getProduct(req)

            console.log('result - 1 ' + i, result)
            if (!result.isSuccess) {
                console.log('result isSuccess', bill)
                resolve(5)
            }

            console.log('result.data.price' + i, result.data.price, items[i].quantity)
            bill = bill + result.data.price * items[i].quantity

        }

        console.log('bill done--------------------------->', bill)
        resolve(bill)
    })
}
module.exports = { getCartDetails, modifyCart }
