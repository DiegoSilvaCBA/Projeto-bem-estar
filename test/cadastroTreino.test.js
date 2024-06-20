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

    
    jest.spyOn(Treino, 'findAll').mockImplementation(() => {
      return Promise.resolve(treinosMock);
    });

    // Chamar Método
    const treinos = await cadastroTreino.listarTreinos();

    // Verificando se Treino.findAll foi chamado
    expect(Treino.findAll).toHaveBeenCalled();

    // Verificando se os treinos retornados são os esperados
    expect(treinos).toEqual(treinosMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('deve excluir um treino existente', async () => {
    const treinoExistente = await cadastroTreino.adicionarTreino('Treino 3', '2024-06-23', '13:00');
    const treinoExcluido = await cadastroTreino.excluirTreino(treinoExistente.id);
    expect(treinoExcluido).toBe(true);
  });

  // Teste para tratar o cenário em que um treino não existe ao tentar excluí-lo
  it('deve retornar falso ao tentar excluir um treino inexistente', async () => {
    const treinoExcluido = await cadastroTreino.excluirTreino(9999); // ID inexistente
    expect(treinoExcluido).toBe(false);
  });

  // Teste para tratar erros ao adicionar um treino
  it('deve lançar um erro ao tentar adicionar um treino com dados inválidos', async () => {
    await expect(cadastroTreino.adicionarTreino('', '', '')).rejects.toThrow('Não foi possível adicionar o treino.');
  });

  // Teste para tratar erros ao atualizar um treino
  it('deve lançar um erro ao tentar atualizar um treino inexistente', async () => {
    await expect(cadastroTreino.atualizarTreino(9999, 'Treino Inexistente', '2024-06-24', '14:00')).rejects.toThrow('Não foi possível atualizar o treino.');
  });

  it('deve lidar com erro ao adicionar treino', async () => {
    Treino.create.mockRejectedValue(new Error('Erro ao adicionar treino'));

    await expect(cadastroTreino.adicionarTreino('Treino', '2024-06-20', '08:00')).rejects.toThrow('Não foi possível adicionar o treino.');
  });

});

//