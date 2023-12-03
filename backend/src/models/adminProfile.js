const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const AdminProfile = sequelize.define('AdminProfile', {
  AdminID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

User.hasOne(AdminProfile, { foreignKey: 'UserID' });
AdminProfile.belongsTo(User, { foreignKey: 'UserID' });

module.exports = AdminProfile;