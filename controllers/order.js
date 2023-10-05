var Orders = require('../models/order')
var { getUniqueID } = require('../utils/utils')

var { getCartDetails } = require('../controllers/cart')


function getOrderDetails(req, res) {
    return new Promise((resolve, reject) => {
        const params = req.params;
        Orders.findOne({ user_id: params.id }, function (err, order) {
            if (err) {
                resolve({ isSuccess: false, message: "Not able to find the Order Details", error: err })
            } else {
                console.log('data', order)
                if (!order) {
                    resolve({ isSuccess: true, message: "Orders details fetched Successfully - No item Found", data: order, length: 0 })
                } else {
                    resolve({ isSuccess: true, message: "Orders details fetched Successfully", data: order, length: order.length })
                }
            }
        });
    })
}

function createOrder(req, res) {
    return new Promise(async (resolve, reject) => {
        console.log('modifyOrder Req Body', req.body)
        let { user_id, address, items, billAmount, paymentId, trackingUrl, statusCode = 1 } = req.body
        // let cartDetails = getCartDetails(req, res)
        // let billAmount = cartDetails.data.billAmount
        // let CartItems = cartDetails.data

        try {

            Orders.countDocuments({}, async function (err, count) {
                console.log('count', count)

                let id = await getUniqueID("order", count + 1)
                console.log('ID:', id)

                let orderObj = {
                    id,
                    user_id,
                    items,
                    address,
                    statusCode,
                    billAmount,
                    paymentId,
                    trackingUrl
                }

                const order = new Orders(orderObj);

                console.log('orderObj:', orderObj)
                order.save((err, data) => {
                    if (err) {
                        resolve({ isSuccess: false, message: "", error: err })
                    } else {
                        console.log('data', data)
                        resolve({ isSuccess: true, message: "", data: data })
                    }
                });

            });



        } catch (error) {
            console.log('error: createOrder', error)
            reject({ isSuccess: false, error: error })
        }
    })
}

module.exports = { getOrderDetails, createOrder }
