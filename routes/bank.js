const express = require('express');
const { getProducts } = require('../controller/admin');
const Router =  express.Router();
const customerController = require('../controller/bank')

Router.get('/', customerController.getIndex);

Router.get('/Products', customerController.getProducts)

Router.get('/products/:productId', customerController.getProduct)

Router.get('/create-order/:productId', customerController.createOrder)

Router.get('/orders', customerController.getOrder)

module.exports = Router;