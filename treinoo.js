class Treino {
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
        this.exercicios = [];
    }

    // Método para obter o nome do treino
    getNome() {
        return this.nome;
    }

    // Método para obter a descrição do treino
    getDescricao() {
        return this.descricao;
    }

    // Método para atualizar o nome do treino
    setNome(novoNome) {
        this.nome = novoNome;
    }

    // Método para atualizar a descrição do treino
    setDescricao(novaDescricao) {
        this.descricao = novaDescricao;
    }

    // Método para adicionar um exercício ao treino
    adicionarExercicio(exercicio) {
        this.exercicios.push(exercicio);
    }

    // Método para listar todos os exercícios do treino
    listarExercicios() {
        return this.exercicios;
    }
}

module.exports = Treino;
