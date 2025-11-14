const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Patient = require('./Patient');
const Doctor = require('./Doctor');

const Mapping = sequelize.define('Mapping', {
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id',
    },
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Doctor,
      key: 'id',
    },
  },
  assigned_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, { timestamps: false });

Mapping.belongsTo(Patient, { foreignKey: 'patient_id' });
Mapping.belongsTo(Doctor, { foreignKey: 'doctor_id' });

module.exports = Mapping;
