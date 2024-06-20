const Exercicio = require('../exercicios.js');

describe('Exercicio de Costa e Ombro - Remada Alta', () => {
  // Teste para o construtor
  it('deve criar um objeto Exercicio com nome e descrição para Remada Alta', () => {
      const exercicio = new Exercicio('Remada Alta', 'Exercício para desenvolvimento dos músculos do ombro e dorsal.');
      expect(exercicio.getNome()).toBe('Remada Alta');
      expect(exercicio.getDescricao()).toBe('Exercício para desenvolvimento dos músculos do ombro e dorsal.');
  });

  // Teste para modificar a descrição usando setDescricao
  it('deve modificar a descrição corretamente para Remada Alta', () => {
      const exercicio = new Exercicio('Remada Alta', 'Descrição original');
      exercicio.setDescricao('Exercício para fortalecimento de ombros e costas.');
      expect(exercicio.getDescricao()).toBe('Exercício para fortalecimento de ombros e costas.');
  });

  // Teste para verificar se getNome retorna corretamente
  it('deve retornar o nome correto do exercício', () => {
      const exercicio = new Exercicio('Remada Alta', 'Descrição original');
      expect(exercicio.getNome()).toBe('Remada Alta');
  });

  // Teste para verificar se getDescricao retorna corretamente
  it('deve retornar a descrição correta do exercício', () => {
      const exercicio = new Exercicio('Remada Alta', 'Descrição original');
      expect(exercicio.getDescricao()).toBe('Descrição original');
  });

  // Teste para modificar a descrição usando setDescricao mais de uma vez
  it('deve modificar a descrição múltiplas vezes e retornar a última descrição definida', () => {
      const exercicio = new Exercicio('Remada Alta', 'Descrição original');
      exercicio.setDescricao('Descrição modificada pela primeira vez');
      exercicio.setDescricao('Descrição modificada pela segunda vez');
      expect(exercicio.getDescricao()).toBe('Descrição modificada pela segunda vez');
  });

  // Teste para verificar se setDescricao aceita uma string vazia como argumento
  it('deve aceitar uma string vazia como descrição', () => {
      const exercicio = new Exercicio('Remada Alta', 'Descrição original');
      exercicio.setDescricao('');
      expect(exercicio.getDescricao()).toBe('');
  });

  // Teste para verificar se setDescricao lança um erro se o argumento não for uma string
  it('deve lançar um erro se setDescricao receber um argumento que não é uma string', () => {
      const exercicio = new Exercicio('Remada Alta', 'Descrição original');
      const callSetDescricaoWithNumber = () => exercicio.setDescricao(123); // Tentativa de passar um número como descrição
      expect(callSetDescricaoWithNumber).toThrow(TypeError);
  });
});