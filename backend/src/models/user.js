const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Role = require('./role');

const User = sequelize.define('User', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  FullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserRole: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

//User.belongsToMany(Role, { through: 'UserRole', foreignKey: 'UserID' });
//Role.belongsToMany(User, { through: 'UserRole', foreignKey: 'RoleID' });

module.exports = User;
