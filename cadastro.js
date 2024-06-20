class Cadastro {
  constructor(nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  validarEmail() {
    return /\S+@\S+\.\S+/.test(this.email);
  }

  validarSenha() {
    // Valida se a senha tem pelo menos 6 caracteres
    return this.senha.length >= 6;
  }

  alterarEmail(novoEmail) {
    this.email = novoEmail;
    console.log(`E-mail alterado para: ${this.email}`);
  }

  alterarSenha(novaSenha) {
    this.senha = novaSenha;
    console.log("Senha alterada com sucesso!");
  }

  realizarCadastro() {
    if (this.validarEmail() && this.validarSenha()) {
      console.log("Cadastro realizado com sucesso!");
    } else {
      console.log("Cadastro não realizado. Verifique seus dados.");
    }
  }
}

module.exports = Cadastro;