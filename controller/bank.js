const Product = require('../models/product');
const OrderItem = require('../models/order-item');
const Order = require('../models/orders');

// to get the first page
const getIndex = (req, res, next) => {
Product
.findAll()
.then(products => {
    res.render('bank/index',{
        prods: products,
        pageTitle: 'Bank',
        path:'/customer'
    });
})
.catch(error => {
    console.error()
})

}

const getProducts = (req, res, next) => {}

//to display the products
const getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log(prodId);
    Product.findByPk(prodId)
    .then(product =>{
        res.render('bank/product-details', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        })
    })
    
    .catch(error => {console.log(error)})
}


//to create the order
const createOrder = (req, res, next) => {
    var d = new Date();
    const prodId = req.params.productId;
    console.log(req);
     Product.findByPk(prodId)
    .then(product =>{
        
        const orderId = 'ORD-' + prodId+ '-' + d.toISOString().slice(0,13);
        console.log(d);
        const title = product.title
        console.log(title);
        console.log(product.price);
        console.log(product.description);
        OrderItem.create({
            productId: prodId,
            orderId: orderId

        })
        Order.create({
            paymentId:  'PAY'+ orderId,
            payerId: 1,
            paymentTotal: product.price
        })
        .then(
            result => {
                console.log('order placed !!!!');
                res.render('bank/checkout', {
                    product: product,
                    pageTitle: 'Checkout',
                    path: '/products'})
            }
        )
       })
   
    .catch(error => {console.log(error)})

}


//to get the order
const getOrder = (req, res, next) => {
     OrderItem.findAll()   
    .then(products => {
          res.render('bank/orders', {
              orders: products,
              pageTitle: 'Orders',
              path: '/products'

          })

    })
    .catch(error => {
        console.log(error)
    }) 

}

module.exports = {getIndex, getProducts, getProduct, createOrder, getOrder}