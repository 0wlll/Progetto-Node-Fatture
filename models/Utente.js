const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class Utente extends Model {}

Utente.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
    },
    cognome: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    ruolo: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.STRING,
    },
    portafoglio_di: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: "utenti",
    timestamps: false,
  }
);

module.exports = { Utente };
