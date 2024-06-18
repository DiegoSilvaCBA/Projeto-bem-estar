const { Sequelize } = require('sequelize');

// Configuração da conexão com SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Caminho para o arquivo do banco de dados
});

module.exports = sequelize;