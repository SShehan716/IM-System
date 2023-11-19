const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user'); // Import the User model

const InternProfile = sequelize.define('InternProfile', {
  InternProfileID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  University: DataTypes.STRING,
  InterviewScore: DataTypes.INTEGER,
  InterviewFeedback: DataTypes.TEXT,
  Evolution1Score: DataTypes.INTEGER,
  Evolution1Feedback: DataTypes.TEXT,
  Evolution2Score: DataTypes.INTEGER,
  Evolution2Feedback: DataTypes.TEXT,
  Accomplishments: DataTypes.TEXT,
  GPA: DataTypes.DECIMAL(3, 2),
  ProjectDetails: DataTypes.TEXT,
  AssignedTeam: DataTypes.STRING,
  Status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasOne(InternProfile, { foreignKey: 'UserID' });
InternProfile.belongsTo(User, { foreignKey: 'UserID' });

User.hasMany(InternProfile, { foreignKey: 'MentorID', as: 'Interns' });
InternProfile.belongsTo(User, { foreignKey: 'MentorID', as: 'Mentor' });

module.exports = InternProfile;
