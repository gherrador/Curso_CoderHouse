const  ProductServices = require("./products")
let  products  = require("../models/Productos")
const { NODE_ENV } = require('../../config');

if (NODE_ENV.trim() == 'staging') {
    (products) = require('../../__test__/__mocks__/Productos');
}

module.exports = {
    productService: ProductServices(products),
    
}