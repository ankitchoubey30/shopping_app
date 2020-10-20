const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Order = sequelize.define('order',
{
id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
paymentId: Sequelize.STRING,
payerId : Sequelize.STRING,
paymentTotal :  Sequelize.FLOAT

})

module.exports = Order;
