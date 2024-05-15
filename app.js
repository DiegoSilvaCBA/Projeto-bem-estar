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
//CRUD EXERCÍCIO
const Exercicio = require('./exercicio');

class CadastroExercicios {
    constructor() {
        this.exercicios = [];
    }

    // Create - Adicionar um novo exercício
    adicionarExercicio(nome, descricao) {
        const exercicio = new Exercicio(nome, descricao);
        this.exercicios.push(exercicio);
    }

    // Read - Listar todos os exercícios
    listarExercicios() {
        return this.exercicios;
    }

    // Update - Atualizar os detalhes de um exercício existente
    atualizarExercicio(nome, novaDescricao) {
        const exercicio = this.exercicios.find(exercicio => exercicio.nome === nome);
        if (exercicio) {
            exercicio.descricao = novaDescricao;
        } else {
            console.log("Exercício não encontrado");
        }
    }

    // Delete - Remover um exercício existente
    removerExercicio(nome) {
        this.exercicios = this.exercicios.filter(exercicio => exercicio.nome !== nome);
    }
}

// Exemplo de uso:

const cadastro = new CadastroExercicios();

cadastro.adicionarExercicio("Flexões", "Exercício para peito e tríceps");
cadastro.adicionarExercicio("Agachamento", "Exercício para pernas e glúteos");

console.log("Exercícios cadastrados:");
console.log(cadastro.listarExercicios());

cadastro.atualizarExercicio("Flexões", "Exercício para peito, tríceps e ombros");

console.log("Exercícios após atualização:");
console.log(cadastro.listarExercicios());

cadastro.removerExercicio("Agachamento");

console.log("Exercícios após remoção:");
console.log(cadastro.listarExercicios());

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
