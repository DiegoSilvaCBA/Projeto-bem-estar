const Treino = require('./models/Treino');

class CadastroTreino {
  async adicionarTreino(nome, data, hora) {
    try {
      const novoTreino = await Treino.create({ nome, data, hora });
      return novoTreino;
    } catch (error) {
      throw new Error('Não foi possível adicionar o treino.');
    }
  }

  async atualizarTreino(id, nome, data, hora) {
    try {
      const treino = await Treino.findByPk(id);
      if (!treino) {
        return null;
      }
      treino.nome = nome;
      treino.data = data;
      treino.hora = hora;
      await treino.save();
      return treino;
    } catch (error) {
      throw new Error('Não foi possível atualizar o treino.');
    }
  }

  async listarTreinos() {
    try {
      const treinos = await Treino.findAll();
      return treinos;
    } catch (error) {
      throw new Error('Não foi possível listar os treinos.');
    }
  }

  async excluirTreino(id) {
    try {
      const treino = await Treino.findByPk(id);
      if (!treino) {
        return false;
      }
      await treino.destroy();
      return true;
    } catch (error) {
      throw new Error('Não foi possível excluir o treino.');
    }
  }
}

module.exports = CadastroTreino;
