const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Patient = sequelize.define('Patient', {
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER },
  gender: { type: DataTypes.STRING },
  details: { type: DataTypes.TEXT },
}, {
  timestamps: true,
});

Patient.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = Patient;
