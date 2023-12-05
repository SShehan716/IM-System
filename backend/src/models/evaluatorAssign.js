
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const EvaluatorProfile = require('./evaluatorProfile');
const InternProfile = require('./InternProfile');

const EvaluatorAssign = sequelize.define('EvaluatorAssign', {

});

EvaluatorProfile.hasMany(EvaluatorAssign, { foreignKey: 'EvaluatorID' });
EvaluatorAssign.belongsTo(EvaluatorProfile, { foreignKey: 'EvaluatorID' });

InternProfile.hasOne(EvaluatorAssign, { foreignKey: 'InternID' });
EvaluatorAssign.belongsTo(InternProfile, { foreignKey: 'InternID' });

module.exports = EvaluatorAssign;