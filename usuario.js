const Cadastro = require('./cadastro');
const Treino = require('./treino.js');

// Defina a classe Usuario
class Usuario {
  constructor(nome, email, senha) {     // Crie um objeto Cadastro para o usuário
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.cadastro = new Cadastro(nome, email, senha);
    this.treinos = [];                   // Inicialize a lista de treinos do usuário como vazia
  }

  // Método para realizar o cadastro do usuário
  realizarCadastro() {
    this.cadastro.realizarCadastro();   // Chame o método realizarCadastro da instância de Cadastro
  }

  // Método para adicionar um novo treino
  adicionarTreino(treino) {
    if (treino instanceof Treino) {     // Verifique se o objeto passado é uma instância de Treino
      this.treinos.push(treino);        // Adicione o treino à lista de treinos do usuário
      console.log("Treino adicionado com sucesso!");
    } else {
      console.log("O objeto passado não é uma instância de Treino.");
    }
  }
  removerTreino(nomeTreino) {
    this.treinos = this.treinos.filter(treino => treino.getNome() !== nomeTreino);
}

}

module.exports = Usuario;