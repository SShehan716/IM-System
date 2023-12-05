const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const MentorProfile = require('./mentorprofile');
const InternProfile = require('./InternProfile');

const MentorAssign = sequelize.define('MentorAssign', {

});

MentorProfile.hasMany(MentorAssign, { foreignKey: 'MentorID' });
MentorAssign.belongsTo(MentorProfile, { foreignKey: 'MentorID' });

InternProfile.hasOne(MentorAssign, { foreignKey: 'InternID' });
MentorAssign.belongsTo(InternProfile, { foreignKey: 'InternID' });

module.exports = MentorAssign;
