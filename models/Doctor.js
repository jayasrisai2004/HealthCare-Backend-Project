
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Doctor = sequelize.define('Doctor', {
  name: { type: DataTypes.STRING, allowNull: false },
  specialty: { type: DataTypes.STRING },
  contactInfo: { type: DataTypes.TEXT },
}, {
  timestamps: true,
});

Doctor.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = Doctor;
