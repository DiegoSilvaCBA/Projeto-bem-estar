const Usuario = require('../usuario.js');

describe('Usuario', () => {
  it('Deve criar um usuário com os dados corretos', () => {
    // Teste básico para criar um usuário
    const usuario = new Usuario("Joao", "joao@example.com", "123456");
    
    // Verificações básicas
    expect(usuario.nome).toBe("Joao");
    expect(usuario.email).toBe("joao@example.com");
    expect(usuario.senha).toBe("123456");
  });

  it('Deve criar um usuário com email em caixa baixa', () => {
    // Teste para verificar se o email é armazenado em caixa baixa
    const usuario = new Usuario("Maria", "MARIA@EXAMPLE.COM", "senha123");
    
    // Verificações específicas para o caso de email em caixa baixa
    expect(usuario.nome).toBe("Maria");
    expect(usuario.email).toBe("maria@example.com"); // Espera-se que o email seja convertido para caixa baixa
    expect(usuario.senha).toBe("senha123");
  });

  it('Deve criar um usuário com senha forte', () => {
    // Teste para verificar se a senha é considerada forte
    const usuario = new Usuario("Pedro", "pedro@teste.com", "SenhaForte@123!");
    
    // Verificações específicas para uma senha forte
    expect(usuario.nome).toBe("Pedro");
    expect(usuario.email).toBe("pedro@teste.com");
    expect(usuario.senha).toBe("SenhaForte@123!");
  });

  it('Deve alterar a senha do usuário corretamente', () => {
    // Cria um usuário para teste
    const usuario = new Usuario("Ana", "ana@teste.com", "senha456");
    
    // Altera a senha do usuário
    usuario.alterarSenha("novaSenha789");
    
    // Verifica se a senha foi alterada corretamente
    expect(usuario.senha).toBe("novaSenha789");
  });

  it('Deve retornar informações do usuário corretamente através do método toString()', () => {
    // Cria um usuário para teste
    const usuario = new Usuario("Paula", "paula@teste.com", "senha987");
    
    // Verifica se o método toString() retorna as informações corretas do usuário
    expect(usuario.toString()).toBe("Nome: Paula | Email: paula@teste.com");
  });
});