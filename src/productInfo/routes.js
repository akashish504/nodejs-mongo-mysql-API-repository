const express = require('express');
const {
    listAllProducts,
    addNewProduct,
    getProductInfo
} = require('./controller');

const {
    verifyToken
} = require('./../userAuth/helper');

const productRoutes = express.Router();

productRoutes.get('/getProductInfo', verifyToken, getProductInfo)
productRoutes.get('/listAllProducts', verifyToken, listAllProducts);
productRoutes.post('/addNewProduct', verifyToken, addNewProduct)


module.exports = {
    productRoutes
}