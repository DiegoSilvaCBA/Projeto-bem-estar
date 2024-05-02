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

