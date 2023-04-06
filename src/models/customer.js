const { DataTypes } = require("sequelize");

const sequelize = require("../utils/DbConnection");

const Customer = sequelize.define("customer", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER
  },
  referral_code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  purchase_coupon_code: {
    type: DataTypes.STRING
  },
  referred_by: DataTypes.INTEGER,
  referred_code_used: DataTypes.STRING,
});

Customer.beforeCreate((customer) => {
  return Customer.max("id").then((maxId) => {
    console.log(maxId)
    customer.position = 99 + ( (maxId+1) - 1);
  });
});

module.exports = Customer;
