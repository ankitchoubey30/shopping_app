const Sequelize = require('sequelize');
var bcrypt = require("bcrypt");
const sequelize = require('../util/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  role: Sequelize.STRING,
  password : Sequelize.STRING
},
{
    timestamps: false
}  );

module.exports = User;
