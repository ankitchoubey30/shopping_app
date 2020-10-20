const Product = require('../models/product');

const getAddProduct = (req, res, next) => {
    if(!req.session.isLoggedIn) {
        return res.redirect('/')
    }
      
    
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });

};

const getProducts = (req, res, next) => {
    console.log('Product!!!!!!');
    Product.findAll()
    .then(products => {
        res.render('admin/product',{
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });

    })
    .catch(error => {console.log(error);})
};

const getEditProduct = (req, res, next) => {
    const mode = req.query.edit;
    console.log(mode);
    if(!mode){
        return res.redirect('/')
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId)
    .then(product => {
       if(!product) {
        return res.redirect('/')
     }

     res.render('admin/edit-product', {
        pageTitle: 'Edit product',
        path : '/admin/edit-product',
        editing: mode,
        product: product
     });
    })
    .catch(error => {console.error()})
  };

const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description; 
  
  Product.create
  ({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description})
    .then(result =>{
        console.log('Product Created!!!');
        res.redirect('/admin/products');
    })
    .catch( error=> {console.error()})
 
};

const postEditProduct =  (req, res, next) => {
    console.log('Product Edit page!!!!!!!!!!');
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedprice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.body.imageUrl;
    Product.findByPk(prodId)
    .then(product => {
        product.title = updatedTitle,
        product.price = updatedprice,
        product.description = updatedDescription,
        product.imageUrl = updatedImageUrl

        return product.save();
    })
    .then(result => {
        console.log('Product updated!!!!!!');
        res.redirect('/admin/products')

    })
    .catch(error => {console.error()}) 

};

const postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.findByPk(prodId)
    .then(product => { 
        return product.destroy();
    })
    .then(result => {
      console.log('product deleted!!!!');
      res.redirect('/admin/products')

    })
    .catch(error => {console.log(error)})

};

module.exports = { getAddProduct, getProducts, getEditProduct, postAddProduct, postEditProduct, postDeleteProduct
}
