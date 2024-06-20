const CadastroTreino = require('../cadastroTreino');
const Treino = require('../models/Treino');

// Mockando Treino para simular o comportamento do modelo
jest.mock('../models/Treino', () => ({
  create: jest.fn(),
  findByPk: jest.fn(),
  findAll: jest.fn(),
}));

describe('CadastroTreino', () => {
  let cadastroTreino;

  beforeEach(() => {
    cadastroTreino = new CadastroTreino();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks entre os testes
  });

  it('deve adicionar um treino', async () => {
    const nome = 'Treino 1';
    const data = '2024-06-20';
    const hora = '08:00';

    Treino.create.mockResolvedValue({ id: 1, nome, data, hora });

    const novoTreino = await cadastroTreino.adicionarTreino(nome, data, hora);

    expect(Treino.create).toHaveBeenCalledWith({ nome, data, hora });
    expect(novoTreino).toEqual({ id: 1, nome, data, hora });
  });

  it('deve atualizar um treino existente', async () => {
    const id = 1;
    const nome = 'Treino Atualizado';
    const data = '2024-06-21';
    const hora = '10:00';

    const treinoMock = { id, nome: 'Treino Antigo', data: '2024-06-20', hora: '09:00', save: jest.fn() };
    Treino.findByPk.mockResolvedValue(treinoMock);

    const treinoAtualizado = await cadastroTreino.atualizarTreino(id, nome, data, hora);

    expect(Treino.findByPk).toHaveBeenCalledWith(id);
    expect(treinoMock.nome).toBe(nome);
    expect(treinoMock.data).toBe(data);
    expect(treinoMock.hora).toBe(hora);
    expect(treinoMock.save).toHaveBeenCalled();
    expect(treinoAtualizado).toEqual(treinoMock);
  });

  it('deve listar todos os treinos', async () => {
    const treinosMock = [
      { id: 1, nome: 'Treino 1', data: '2024-06-20', hora: '08:00' },
      { id: 2, nome: 'Treino 2', data: '2024-06-21', hora: '09:00' },
    ];

    Treino.findAll.mockResolvedValue(treinosMock);

    const treinos = await cadastroTreino.listarTreinos();

    expect(Treino.findAll).toHaveBeenCalled();
    expect(treinos).toEqual(treinosMock);
  });

  it('deve excluir um treino existente', async () => {
    const id = 1;

    const treinoMock = { id, nome: 'Treino 1', data: '2024-06-20', hora: '08:00', destroy: jest.fn() };
    Treino.findByPk.mockResolvedValue(treinoMock);

    const resultadoExclusao = await cadastroTreino.excluirTreino(id);

    expect(Treino.findByPk).toHaveBeenCalledWith(id);
    expect(treinoMock.destroy).toHaveBeenCalled();
    expect(resultadoExclusao).toBe(true);
  });

  it('deve lidar com erro ao adicionar treino', async () => {
    Treino.create.mockRejectedValue(new Error('Erro ao adicionar treino'));

    await expect(cadastroTreino.adicionarTreino('Treino', '2024-06-20', '08:00')).rejects.toThrow('Não foi possível adicionar o treino.');
  });

});

