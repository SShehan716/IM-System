const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user'); // Import the User model

const MentorProfile = sequelize.define('MentorProfile', {
  MentorID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

User.hasOne(MentorProfile, { foreignKey: 'UserID' });
MentorProfile.belongsTo(User, { foreignKey: 'UserID' });

module.exports = MentorProfile;
