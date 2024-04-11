class CadastroTreino {
    constructor() {
        this.treinos = [];
    }

    adicionarTreino(nome, data, hora) {
        const novoTreino = {
            id: this.treinos.length + 1,
            nome,
            data,
            hora
        };
        this.treinos.push(novoTreino);
        return novoTreino;
    }

    atualizarTreino(id, nome, data, hora) {
        const treino = this.treinos.find(treino => treino.id === id);
        if (!treino) {
            return null; 
        }

        treino.nome = nome;
        treino.data = data;
        treino.hora = hora;

        return treino;
    }

    listarTreinos() {
        return this.treinos;
    }

    excluirTreino(id) {
        const index = this.treinos.findIndex(treino => treino.id === id);
        if (index === -1) {
            return false; 
        }

        this.treinos.splice(index, 1);
        return true;
    }
}

module.exports = CadastroTreino;
