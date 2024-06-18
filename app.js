const express = require('express');
const bodyParser = require('body-parser');
const Cadastro = require('./Cadastro');
const CadastroTreino = require('./CadastroTreino');
const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Conectar ao banco de dados e sincronizar modelos
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso.');
    await sequelize.sync(); // Não use { force: true } em produção

    // Cadastro CRUD 
    app.post('/cadastro', async (req, res) => {
      const { nome, email, senha } = req.body;
      const novoCadastro = new Cadastro(nome, email, senha);
      if (novoCadastro.validarEmail()) {
        try {
          const user = await User.create({ nome, email, senha });
          res.status(201).json({ message: 'Cadastro realizado com sucesso!', user });
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      } else {
        res.status(400).json({ error: 'E-mail inválido. Por favor, insira um e-mail válido.' });
      }
    });

    app.get('/cadastros', async (req, res) => {
      try {
        const users = await User.findAll();
        res.json(users);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    // CadastroTreino CRUD 
    const cadastroTreino = new CadastroTreino();

    app.post('/treino', (req, res) => {
      const { nome, data, hora } = req.body;
      const novoTreino = cadastroTreino.adicionarTreino(nome, data, hora);
      res.status(201).json(novoTreino);
    });

    app.get('/treinos', (req, res) => {
      const treinos = cadastroTreino.listarTreinos();
      res.json(treinos);
    });

    app.put('/treino/:id', (req, res) => {
      const { id } = req.params;
      const { nome, data, hora } = req.body;
      const treinoAtualizado = cadastroTreino.atualizarTreino(parseInt(id), nome, data, hora);
      if (treinoAtualizado) {
        res.json(treinoAtualizado);
      } else {
        res.status(404).json({ error: 'Treino não encontrado.' });
      }
    });

    app.delete('/treino/:id', (req, res) => {
      const { id } = req.params;
      const resultado = cadastroTreino.excluirTreino(parseInt(id));
      if (resultado) {
        res.json({ message: 'Treino excluído com sucesso.' });
      } else {
        res.status(404).json({ error: 'Treino não encontrado.' });
      }
    });

    // Iniciar o servidor após a conexão com o banco de dados
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });

  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
})();
