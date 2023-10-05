var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
    id: { type: String, unique: true, min: 1, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    categoryId: { type: String, required: true },
    subCategory: { type: String, required: true },
    subCategoryId: { type: String, required: true },
    manufacturer: { type: String },
    imagePath: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    isActive: { type: Number, default: 1 }
})

module.exports = mongoose.model('Product', productSchema)