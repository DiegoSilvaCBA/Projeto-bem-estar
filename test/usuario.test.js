const Usuario = require('../usuario.js');
const Treino = require('../treino.js');

describe('Usuario', () => {
  it('Deve criar um usuário com os dados corretos', () => {
    const usuario = new Usuario("Joao", "joao@example.com", "123456");
    console.log("oi")
    expect(usuario.nome).toBe("Joao");
    expect(usuario.email).toBe("joao@example.com");
    expect(usuario.senha).toBe("123456");
  });
});
