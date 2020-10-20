const User = require('../models/user');

const adminUser = (req, res, next) => {
    const loggedInUserRole = req.get('Cookie').split(';')[0]
    .trim()
    .split('=')[0];
    console.log(loggedInUserRole);
    if (loggedInUserRole != 'admin'){
                console.log('inside condtion statement');
                 return res.render('error/admin');
               
             }
    next();

} 

module.exports = adminUser;