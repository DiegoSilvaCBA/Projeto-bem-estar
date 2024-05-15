const Cadastro = require('./Cadastro');
const Treino = require('./Treino');

// Defina a classe Usuario
class Usuario {
  constructor(nome, email, senha) {
    // Crie um objeto Cadastro para o usuário
    this.cadastro = new Cadastro(nome, email, senha);
    // Inicialize a lista de treinos do usuário como vazia
    this.treinos = [];
  }

  // Método para realizar o cadastro do usuário
  realizarCadastro() {
    // Chame o método realizarCadastro da instância de Cadastro
    this.cadastro.realizarCadastro();
  }

  // Método para adicionar um novo treino
  adicionarTreino(treino) {
    // Verifique se o objeto passado é uma instância de Treino
    if (treino instanceof Treino) {
      // Adicione o treino à lista de treinos do usuário
      this.treinos.push(treino);
      console.log("Treino adicionado com sucesso!");
    } else {
      console.log("O objeto passado não é uma instância de Treino.");
    }
  }

}

module.exports = Usuario;