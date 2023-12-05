const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const EvaluatorProfile = sequelize.define('EvaluatorProfile', {
  EvaluatorID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Designation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasOne(EvaluatorProfile, { foreignKey: 'UserID' });
EvaluatorProfile.belongsTo(User, { foreignKey: 'UserID' });

module.exports = EvaluatorProfile;
