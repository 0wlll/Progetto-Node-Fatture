const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Fattura extends Model {}

Fattura.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data: {
    type: DataTypes.DATE
  },
  utente: {
    type: DataTypes.STRING
  },
  indirizzata: {
    type: DataTypes.STRING
  },
  motivazioni: {
    type: DataTypes.STRING
  },
  somma: {
    type: DataTypes.DECIMAL
  }
}, {
  sequelize,
  timestamps: false,
  tableName: 'fattures'
});

module.exports = {Fattura};
