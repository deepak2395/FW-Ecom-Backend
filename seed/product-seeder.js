var mongoose = require('mongoose');
var Product = require('../models/product')
var { getUniqueID } = require('../helpers/utils')
/*  const fs = require('fs')
const path = require('path')
const contents = fs.readFileSync(path.join(__dirname, '..', '/resources/images/sparkles.jpg'), "base64")
 
console.log('contents', contents)

console.log('HI') */

var image = 'https://images.pexels.com/photos/288478/pexels-photo-288478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

var products = [new Product({
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
}),
new Product({
    name: "Sparkle 30CM",
    category: "Cracker",
    categoryId: "1",
    subCategory: "Sparkle",
    subCategoryId: "1_001",
    manufacturer: "Standrard",
    imagePath: image,
    title: "Sparkle 30CM",
    description: "Night lighting - Sparkle on firing the cracker",
    price: 30
}),
new Product({
    name: "Sparkle 50CM",
    category: "Cracker",
    categoryId: "1",
    subCategory: "Sparkle",
    subCategoryId: "1_001",
    manufacturer: "Standrard",
    imagePath: image,
    title: "Sparkle 50CM",
    description: "Night lighting - Sparkle on firing the cracker",
    price: 30
}),
new Product({
    name: "Sparkle 75CM",
    category: "Cracker",
    categoryId: "1",
    subCategory: "Sparkle",
    subCategoryId: "1_001",
    manufacturer: "Standrard",
    imagePath: image,
    title: "Sparkle 75CM",
    description: "Night lighting - Sparkle on firing the cracker",
    price: 20
}),
new Product({
    name: "100 Wala",
    category: "Cracker",
    categoryId: "1",
    subCategory: "Garlands",
    subCategoryId: "1_002",
    manufacturer: "Standrard",
    imagePath: image,
    title: "100 Wala",
    description: "Day / Night - Sound Cracker",
    price: 100
}),
new Product({
    name: "200 Wala",
    category: "Cracker",
    categoryId: "1",
    subCategory: "Garlands",
    subCategoryId: "1_002",
    manufacturer: "Standrard",
    imagePath: image,
    title: "200 Wala",
    description: "Day / Night - Sound Cracker",
    price: 200
}),
new Product({
    name: "500 Wala",
    category: "Cracker",
    categoryId: "1",
    subCategory: "Garlands",
    subCategoryId: "1_002",
    manufacturer: "Standrard",
    imagePath: image,
    title: "500 Wala",
    description: "Day / Night - Sound Cracker",
    price: 500
}),
new Product({
    name: "1000 Wala",
    category: "Cracker",
    categoryId: "1",
    subCategory: "Garlands",
    subCategoryId: "1_002",
    manufacturer: "Standrard",
    imagePath: image,
    title: "1000 Wala",
    description: "Day / Night - Sound Cracker",
    price: 1000
}),
    //Team able to close all stories even of 
]


function startSeeding() {

    products.map(async (product, i) => {
        product.id = await getUniqueID("product", i + 1)
        product.save(function (err, data) {
            if (err) {
                console.log('err-----------------', err)
            } else {
                console.log('data ------', data)
            }
        })
    })

}

async function start() {
    startSeeding()
    console.log('exit')

    //mongoose.disconnect()
}

//start()



