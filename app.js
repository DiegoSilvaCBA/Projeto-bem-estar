const express = require('express');
const Cadastro = require('./cadastro.js');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;
    const novoCadastro = new Cadastro(nome, email, senha);
  
    if (novoCadastro.realizarCadastro()) {
      res.send('Cadastro realizado com sucesso!');
    } else {
      res.status(400).send('E-mail inválido. Por favor, insira um e-mail válido.');
    }
  });
  

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
