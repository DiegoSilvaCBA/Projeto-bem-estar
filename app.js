const express = require('express');
const bodyParser = require('body-parser');
const Cadastro = require('./Cadastro');
const CadastroTreino = require('./CadastroTreino');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Cadastro CRUD 
const cadastros = [];

app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;
  const novoCadastro = new Cadastro(nome, email, senha);
  if (novoCadastro.validarEmail()) {
    cadastros.push(novoCadastro);
    res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
  } else {
    res.status(400).json({ error: 'E-mail inválido. Por favor, insira um e-mail válido.' });
  }
});

app.get('/cadastros', (req, res) => {
  res.json(cadastros);
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

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
