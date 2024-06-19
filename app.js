const express = require('express');
const bodyParser = require('body-parser');
const Cadastro = require('./Cadastro');
const Treino = require('./treinoo');
//const Treino = require('./cadastroTreino');
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

    // Rota para adicionar um novo treino
    app.post('/Treino', async (req, res) => {
      const { nome, data, hora } = req.body;
      try {
        const novoTreino = await Treino.create({ nome, data, hora });
        res.status(201).json(novoTreino);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    // Rota para listar todos os treinos
    app.get('/treinos', async (req, res) => {
      try {
        const treinos = await Treino.findAll();
        res.json(treinos);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    // Rota para atualizar um treino pelo ID
    app.put('/treino/:id', async (req, res) => {
      const { id } = req.params;
      const { nome, data, hora } = req.body;
      try {
        const Treino = await Treino.findByPk(id);
        if (!treino) {
          return res.status(404).json({ error: 'Treino não encontrado.' });
        }
        treino.nome = nome;
        treino.data = data;
        treino.hora = hora;
        await treino.save();
        res.json(treino);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    // Rota para excluir um treino pelo ID
    app.delete('/treino/:id', async (req, res) => {
      const { id } = req.params;
      try {
        const treino = await Treino.findByPk(id);
        if (!treino) {
          return res.status(404).json({ error: 'Treino não encontrado.' });
        }
        await treino.destroy();
        res.json({ message: 'Treino excluído com sucesso.' });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    // Iniciar o servidor após a conexão com o banco de dados
    sequelize.sync({ force: true }).then(() => { force: true})
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });

  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
})();
