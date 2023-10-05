var mongoose = require('mongoose');
var Order = require('../models/order')

var orders = [new Order({
    name: "Sparkle 15CM",
    category: "Cracker",
    categoryId: "1",
    subCategory: "Sparkle",
    subCategoryId: "1_001",
    manufacturer: "Standrard",
    imagePath: image,
    title: "Sparkle 15CM",
    description: "Night lighting - Sparkle on firing the cracker",
    price: 15
})
]