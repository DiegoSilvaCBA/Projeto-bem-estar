const CadastroTreino = require('./CadastroTreino'); // Certifique-se de que o caminho para o arquivo esteja correto
const Treino = require('./models/Treino'); // Importe o modelo Treino (se necessário)

describe('CadastroTreino', () => {
  let cadastro;

  beforeEach(() => {
    cadastro = new CadastroTreino();
  });

  it('deve adicionar um novo treino', async () => {
    const novoTreino = await cadastro.adicionarTreino('Treino A', '2024-06-20', '10:00');
    expect(novoTreino).toBeDefined();
    // Adicione mais asserções conforme necessário
  });

  it('deve atualizar um treino existente', async () => {
    // Crie um treino de teste antes de atualizá-lo
    const treinoExistente = await Treino.create({ nome: 'Treino B', data: '2024-06-21', hora: '15:30' });

    const treinoAtualizado = await cadastro.atualizarTreino(treinoExistente.id, 'Treino B Atualizado', '2024-06-21', '16:00');
    expect(treinoAtualizado).toBeDefined();
    // Adicione mais asserções conforme necessário
  });

  it('deve listar os treinos', async () => {
    const treinos = await cadastro.listarTreinos();
    expect(Array.isArray(treinos)).toBe(true);
    // Adicione mais asserções conforme necessário
  });

  it('deve excluir um treino existente', async () => {
    // Crie um treino de teste antes de excluí-lo
    const treinoExistente = await Treino.create({ nome: 'Treino C', data: '2024-06-22', hora: '14:00' });

    const resultadoExclusao = await cadastro.excluirTreino(treinoExistente.id);
    expect(resultadoExclusao).toBe(true);
    // Verifique se o treino foi realmente excluído do banco de dados
  });
});
