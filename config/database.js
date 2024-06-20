const { Sequelize } = require('sequelize');

// Configuração da conexão com SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

module.exports = sequelize;