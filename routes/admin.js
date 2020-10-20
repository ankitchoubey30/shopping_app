const express = require('express');
const Router =  express.Router();
const adminController = require('../controller/admin')

//to get added product page to add the product
Router.get('/add-product', adminController.getAddProduct);

//to get the already added product 
Router.get('/products', adminController.getProducts);

//to get the edit product page
Router.get('/edit-product/:productId', adminController.getEditProduct);

//send the details to add the product
Router.post('/add-product', adminController.postAddProduct);

//to edit the product
Router.post('/edit-product', adminController.postEditProduct);

//to delete the product
Router.post('/delete-product', adminController.postDeleteProduct);




module.exports = Router;