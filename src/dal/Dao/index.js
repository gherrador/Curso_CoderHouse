const  ProductDao = require("./productsDao")
let  products  = require("../../models/Productos")
const { NODE_ENV } = require('../../../config');

if (NODE_ENV.trim() == 'staging') {
    (products) = require('../../../__test__/__mocks__/Productos');
}

module.exports = {
    productsDao: ProductDao(products),
    
}