var Products = require('../models/product')
var { getUniqueID } = require('../helpers/utils')

function getProduct(req, res) {
    return new Promise((resolve, reject) => {
        console.log('getProduct', req)
        const params = req.params;
        Products.findOne({ _id: params.id, isActive: 1 }, function (err, product) {
            if (err) {
                resolve({ isSuccess: false, message: "Not able to find the products", error: err })
            } else {
                console.log('data', product)
                if (!product) {
                    resolve({ isSuccess: true, message: "Products details fetched Successfully - No product Found", data: product, length: 0 })
                } else {
                    resolve({ isSuccess: true, message: "Products details fetched Successfully", data: product, length: product.length })
                }
            }
        });
    })
}

function getAllProduct(req, res) {
    return new Promise((resolve, reject) => {

        //isActive: 1
        Products.find({ isActive: 1 }, function (err, products) {

            if (err) {
                resolve({ isSuccess: false, message: "Not able to find the products", error: err })
            } else {
                console.log('data', products)
                var productMap = {};

                products.forEach(function (product) {
                    return productMap[product.id] = product;
                });

                resolve({ isSuccess: true, message: "All Products details fetched Successfully", data: productMap, length: products.length })
            }

        });
    })
}

/* id: { type: Number, unique: true, min: 1, required: true },
name: { type: String, required: true },
category: { type: String, required: true },
categoryId: { type: String, required: true },
subCategory: { type: String, required: true },
subCategoryId: { type: String, required: true },
manufacturer: { type: String },
imagePath: { type: String, required: true },
title: { type: String, required: true },
description: { type: String, required: true },
price: { type: Number, required: true } */

function createProduct(req, res) {
    return new Promise((resolve, reject) => {
        console.log('createProduct Req Body', req.body)
        let { name, category, categoryId, subCategory, subCategoryId, manufacturer, imagePath, title, description, price } = req.body
        try {

            Products.countDocuments({}, async function (err, count) {
                console.log('count', count)

                let id = await getUniqueID("product", count + 1)
                console.log('PID:', id)
                let productObj = { id, name, category, categoryId, subCategory, subCategoryId, manufacturer, imagePath, title, description, price }
                const product = new Products(productObj);
                console.log('productObj:', productObj)
                product.save((err, data) => {
                    if (err) {
                        resolve({ isSuccess: false, message: "", error: err })
                    } else {
                        console.log('data', data)
                        resolve({ isSuccess: true, message: "", data: data })
                    }
                });

            });



        } catch (error) {
            // throw new error(error)
            console.log('error: createProduct', error)
            reject({ isSuccess: false, error: error })
        }
    })
}

function modifyProductProperty(req, res) {
    return new Promise((resolve, reject) => {

        let { name, category, categoryId, subCategory, subCategoryId, manufacturer, imagePath, title, description, price } = req.body

        let productObj = { name, category, categoryId, subCategory, subCategoryId, manufacturer, imagePath, title, description, price }

        //const Product = new Product();
        Products.findOneAndUpdate({ id: id, isActive: 1 }, productObj, function (err, product) {
            if (err) {
                resolve({ isSuccess: false, message: "Not able to find the products", error: err })
            } else {
                console.log('data', product)
                resolve({ isSuccess: true, message: "Products details fetched and modified Successfully", data: product })
            }
        });
    })
}

function modifyProduct(req, res) {
    return new Promise((resolve, reject) => {

        let { name, category, categoryId, subCategory, subCategoryId, manufacturer, imagePath, title, description, price, id } = req.body

        let productObj = { name, category, categoryId, subCategory, subCategoryId, manufacturer, imagePath, title, description, price }

        //  const Product = new Product();
        Products.findOneAndUpdate({ id: id, isActive: 1 }, productObj, function (err, product) {
            if (err) {
                resolve({ isSuccess: false, message: "Not able to find the products", error: err })
            } else {
                console.log('data', product)
                resolve({ isSuccess: true, message: "Products details fetched and modified Successfully", data: product })
            }
        });
    })
}



function deleteProduct(req, res) {
    return new Promise((resolve, reject) => {

        const params = req.params;
        console.log('delete params', params)
        Products.findOneAndUpdate({ id: params.id, isActive: 1 }, { isActive: 0 }, function (err, product) {
            if (err) {
                resolve({ isSuccess: false, message: "Not able to find the products", error: err })
            } else {
                console.log('data', product)
                resolve({ isSuccess: true, message: "Products Deleted Successfully", data: product })
            }
        });
    })
}

module.exports = { createProduct, getProduct, getAllProduct, modifyProductProperty, modifyProduct, deleteProduct }
