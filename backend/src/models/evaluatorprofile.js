const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User'); // Import the User model

const EvaluatorProfile = sequelize.define('EvaluatorProfile', {
  EvaluatorID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

User.hasOne(EvaluatorProfile, { foreignKey: 'UserID' });
EvaluatorProfile.belongsTo(User, { foreignKey: 'UserID' });

module.exports = EvaluatorProfile;
