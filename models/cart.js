/* module.exports = function Cart(oldCart) {
    let items = oldCart.items;
    let totalQty = oldCart.totalQty;
    let totalPrice = oldCart.totalPrice;

    this.add = function (item, id) {
        var storedItem = items[id]
        if (!storedItem) {
            storedItem = items[id] = { item: item, qty: 0, price: 0 }
        }

        storedItem.qty++
        storedItem.price = storedItem.item.price * storedItem.qty
        totalQty++
        totalPrice += storedItem.totalPrice
    }
} */

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var { getProduct } = require('../controllers/product')

//var itemsSchema = new Schema();

var cartSchema = new Schema({
    id: { type: String, unique: true, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [{
        itemId: { type: String, required: true },
        item_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: Number
    }],
    bill: { type: Number, required: true }
}, {
    timestamps: true
})



/* [] */
/* //Hash plain password before saving
cartSchema.pre('save', async function (next) {
    console.log('triggered---------------------->')
    const cart = this
    console.log('cart triggered', cart)
    cart.bill = await generateBill(cart.items)
    console.log('await bill', cart.bill)
    next()
})

cartSchema.post('findOneAndUpdate', async function (next) {
    console.log('findOneAndUpdate triggered---------------------->', this.getQuery())
    const cart = this
    console.log('cart triggered', cart)
    cart.bill = await generateBill(cart.items)
    console.log('await bill', cart.bill)
    next()
})

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
 */
module.exports = mongoose.model('Cart', cartSchema) 