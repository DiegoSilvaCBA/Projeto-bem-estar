const Exercicio = require('../exercicios.js');

describe('Exercício', () => {
  describe('criarExercicio()', () => {
    it('Deve criar um exercício com nome e descrição corretos', () => {
      const exercicio = new Exercicio("Flexões", "Exercício para peito e tríceps");
      expect(exercicio.nome).toBe("Flexões");
      expect(exercicio.descricao).toBe("Exercício para peito e tríceps");
    });
  });

  describe('atualizarExercicio()', () => {
    it('Deve atualizar a descrição de um exercício corretamente', () => {
      const exercicio = new Exercicio("Flexões", "Exercício para peito e tríceps");
      exercicio.descricao = "Exercício para peito, tríceps e ombros";
      expect(exercicio.descricao).toBe("Exercício para peito, tríceps e ombros");
    });
  });
});
