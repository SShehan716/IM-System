const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const ManagementProfile = sequelize.define('ManagementProfile', {
  ManagementID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Designation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasOne(ManagementProfile, { foreignKey: 'UserID' });
ManagementProfile.belongsTo(User, { foreignKey: 'UserID' });

module.exports = ManagementProfile;