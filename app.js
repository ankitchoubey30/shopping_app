const path = require('path');
const express = require('express')
const sequelize = require('./util/database')
const bodyParser = require('body-parser')
const app = express();
const User = require('./models/user');
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const mysql = require("mysql2")
const restrictAccess = require ('./middleware/auth')
const adminUser = require ('./middleware/adminBasedRoute')

const adminRoutes = require('./routes/admin');
const bankRoutes = require('./routes/bank');
const userRoutes = require('./routes/user')


app.set('view engine', 'ejs');
app.set('views', 'views')

const  mysqlconnection = {
      host: "localhost",
       user: "root",
       password: "pass@word1",
       database: "shopping_app",
       
         
   };

const sessionStore = new MySQLStore(mysqlconnection);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret : 'my secret', resave : false, saveUninitialized: false, store: sessionStore }))
app.use('/', userRoutes);

//app.use('/admin', adminRoutes);
app.use('/admin',restrictAccess, adminUser, adminRoutes);
app.use('/customer',restrictAccess, bankRoutes);

sequelize
//.sync({ force: true })
.sync()
.then().catch(err => console.error(err))

console.log('Banking App started!!!!');

app.listen(4000);

