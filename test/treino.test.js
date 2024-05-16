const CadastroTreino = require('../cadastroTreino');

describe('CadastroTreino', () => {
  let cadastroTreino;

  beforeEach(() => {
    cadastroTreino = new CadastroTreino();
  });

  test('Um novo treino deve ser adicionado', () => {
    const novoTreino = cadastroTreino.adicionarTreino('Corrida', '2024-04-10', '07:00');
    expect(novoTreino).toBeTruthy();
    expect(novoTreino.id).toBe(1);
    expect(novoTreino.nome).toBe('Corrida');
    expect(novoTreino.data).toBe('2024-04-10');
    expect(novoTreino.hora).toBe('07:00');
  });

  test('Ao tentar atualizar um treino inexistente deve retornar null', () => {
    const treinoAtualizado = cadastroTreino.atualizarTreino(1, 'Musculação', '2024-04-12', '18:00');
    expect(treinoAtualizado).toBeNull();
  });

  test('Listará todos os treinos cadastrados', () => {
    cadastroTreino.adicionarTreino('Corrida', '2024-04-10', '07:00');
    cadastroTreino.adicionarTreino('Musculação', '2024-04-12', '18:00');
    const treinos = cadastroTreino.listarTreinos();
    expect(treinos.length).toBe(2);
    expect(treinos[0].nome).toBe('Corrida');
    expect(treinos[1].nome).toBe('Musculação');
  });

  test('Excluirá um treino existente', () => {
    cadastroTreino.adicionarTreino('Corrida', '2024-04-10', '07:00');
    const treinoExcluido = cadastroTreino.excluirTreino(1);
    expect(treinoExcluido).toBe(true);
    const treinosRestantes = cadastroTreino.listarTreinos();
    expect(treinosRestantes.length).toBe(0);
  });

  test('Excluir um treino inexistente deve retornar false', () => {
    const treinoExcluido = cadastroTreino.excluirTreino(1);
    expect(treinoExcluido).toBe(false);
  });
});
