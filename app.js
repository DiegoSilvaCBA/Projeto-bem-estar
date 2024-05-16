const express = require('express');
const bodyParser = require('body-parser');
const Cadastro = require('./Cadastro');
const Usuario = require('./usuario');
const CadastroTreino = require('./CadastroTreino');
const Exercicio = require('./exercicios');
const Treino = require('./Treino'); 

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

//CRUD USUÁRIO



const usuario1 = new Usuario("João", "joao@example.com", "123456");
const usuario2 = new Usuario("Maria", "maria@example.com", "abcdef");

const treino1 = new Treino("Treino de Musculação", "Treino focado em ganho de massa muscular.");
const treino2 = new Treino("Treino de Corrida", "Treino para melhorar a resistência e velocidade.");

// Adicione os treinos aos usuários
usuario1.adicionarTreino(treino1);
usuario2.adicionarTreino(treino2);

// Exiba os usuários e seus treinos
console.log("Usuário 1:", usuario1);
console.log("Usuário 2:", usuario2);

// Atualize o nome do usuário 1
usuario1.cadastro.nome = "João Silva";

// Exiba o usuário 1 atualizado
console.log("Usuário 1 atualizado:", usuario1);

// Remova o treino do usuário 2
usuario2.treinos.pop();

// Exiba o usuário 2 sem o treino removido
console.log("Usuário 2 sem treino:", usuario2);

//CRUD EXERCÍCIO

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


// crud treino

const treinoA = new Treino('Treino A', 'Descrição do Treino A');
const treinoB = new Treino('Treino B', 'Descrição do Treino B');


console.log("Treinos cadastrados:");
console.log(treinoA);
console.log(treinoB);


treinoA.adicionarExercicio('Exercício 1');
treinoA.adicionarExercicio('Exercício 2');

treinoB.adicionarExercicio('Exercício 3');
treinoB.adicionarExercicio('Exercício 4');


console.log("Exercícios do Treino A:");
console.log(treinoA.listarExercicios());

console.log("Exercícios do Treino B:");
console.log(treinoB.listarExercicios());


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
