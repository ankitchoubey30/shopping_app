const User = require('../models/user');
const bcrypt = require('bcryptjs')

const getLogin = (req, res, next) => {
    res.render('userinfo/login');

    }



const postLogin = (req, res, next) => {
    console.log('User info............');
        const email =  req.body.uname;
        const password = req.body.password;
              
        User.findAll({where : {email: email } })
        .then( userDoc => {
          console.log(userDoc[0].password);
        bcrypt.compare(password, userDoc[0].password).then(
            result => {
                if (result) {
                    req.session.isLoggedIn = true;   
                    res.setHeader('Set-Cookie',userDoc[0].role);
                    return res.redirect('/customer')
                }
                
            }
        ).catch(error => {console.log(error)
            res.redirect('/')
        }) 
         } )  
         .catch(error => {console.log(error)
            res.redirect('/')
        }) 

}       

const getRegister = (req, res, next) => {
    res.render('userinfo/register');
}

const postRegister = (req, res, next) => {
    const username = req.body.name;
    const password = req.body.pwd;
    const email = req.body.email;
    
    User.findAll({where : {email: email } })
    .then( userDoc => {
        console.log(userDoc.length);
        if(userDoc.length == 1) {
            console.log('inside loop');
            return res.redirect('/register')
        }
        return bcrypt.hash(password, 12);
    })
    .then(hashedPassword => {
        User.create({
            name: username,
            email: email,
            role: 'customer',
            password : hashedPassword
        })
        .then(result => {
            console.log('User created!!!!!');
            res.redirect('/')})
        .catch(error => console.log(error))
    
    .catch(error => {console.log(error)})

    })
}


const postLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/');
    });
  };

 module.exports = {getLogin, postLogin, getRegister, postRegister, postLogout}   