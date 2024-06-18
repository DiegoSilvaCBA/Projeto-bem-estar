const sequelize = require('./config/database');
const User = require('./models/User');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso.');
    await sequelize.sync({ force: true });  // Use { force: true } para recriar tabelas a cada inicialização (útil em desenvolvimento)
    console.log('Modelos sincronizados.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  } finally {
    await sequelize.close();
  }
})();