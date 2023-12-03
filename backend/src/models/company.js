const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Company = sequelize.define('Company', {
  CompanyID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  CompanyName: DataTypes.STRING,
  CompanyLocation: DataTypes.STRING,
  CompanySize: DataTypes.STRING,
});

module.exports = Company;