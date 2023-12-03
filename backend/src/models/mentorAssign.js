const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const MentorProfile = require('./mentorprofile');
const InternProfile = require('./InternProfile');

const MentorAssign = sequelize.define('MentorAssign', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

MentorProfile.hasMany(MentorAssign, { foreignKey: 'MentorID' });
MentorProfile.belongsTo(MentorProfile, { foreignKey: 'MentorID' });

InternProfile.hasOne(MentorAssign, { foreignKey: 'InternID' });
MentorProfile.belongsTo(InternProfile, { foreignKey: 'InternID' });

module.exports = MentorAssign;
