var mongoose = require('mongoose')
var Schema = mongoose.Schema

var orderSchema = new Schema({
    id: { type: String, unique: true, required: true },
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
    address: { type: String, required: true },
    billAmount: { type: Number, required: true },
    paymentId: { type: String, required: true },
    statusCode: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    trackingUrl: { type: String, required: true },
})

module.exports = mongoose.model('Order', orderSchema)