class Cadastro {
    constructor(nome, email, senha) {
      this.nome = nome;
      this.email = email;
      this.senha = senha;
    }
  
    validarEmail() {
      return /\S+@\S+\.\S+/.test(this.email);
    }
  
    realizarCadastro() {
      if (this.validarEmail()) {
        console.log("Cadastro realizado com sucesso!");
      } else {
        console.log("E-mail inválido. Por favor, insira um e-mail válido.");
      }
    }
  }
  
  module.exports = Cadastro;
  