const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const OrderItem = sequelize.define('orderItem',
{
id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
productId: Sequelize.INTEGER,
orderId : Sequelize.STRING 

});

module.exports = OrderItem;