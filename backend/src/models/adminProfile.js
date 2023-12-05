const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const AdminProfile = sequelize.define('AdminProfile', {
  AdminProfileID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  CanCreateAccounts: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  Designation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasOne(AdminProfile, { foreignKey: 'UserID' });
AdminProfile.belongsTo(User, { foreignKey: 'UserID' });

module.exports = AdminProfile;