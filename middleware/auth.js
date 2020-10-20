const User = require('../models/user');

const restrictAccess = (req, res, next) => {
    
    if (!req.session.isLoggedIn) {
        return res.redirect('/');
    }
    next();
}



module.exports = restrictAccess;