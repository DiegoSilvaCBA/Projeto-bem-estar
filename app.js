const express = require('express');
const Cadastro = require('./cadastro.js');
const CadastroTreino = require('./cadastroTreino.js');

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

}
  
app.post('/treinos', (req, res) => {
  const { nome, data, hora } = req.body;

  const novoTreino = cadastroTreino.adicionarTreino(nome, data, hora);

  if (novoTreino) {
      res.status(201).json(novoTreino);
  } else {
      res.status(400).send('Erro ao cadastrar o treino.');
  }
});

app.get('/treinos', (req, res) => {
  const treinos = cadastroTreino.listarTreinos();
  res.json(treinos);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
