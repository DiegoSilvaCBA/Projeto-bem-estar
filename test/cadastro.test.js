const Cadastro = require('../cadastro.js');

describe('Cadastro', () => {
  describe('#validarEmail()', () => {
    it('Deve retornar verdadeiro para um e-mail válido', () => {
      const cadastro = new Cadastro('Nome', 'email@example.com', 'senha');
      expect(cadastro.validarEmail()).toBe(true);
    });

    it('Deve retornar falso para um e-mail inválido', () => {
      const cadastro = new Cadastro('Nome', 'email@invalid', 'senha');
      expect(cadastro.validarEmail()).toBe(false);
    });
  });
});
