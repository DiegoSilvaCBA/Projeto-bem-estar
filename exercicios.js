class Exercicio {
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }

    getNome() {
        return this.nome;
    }

    getDescricao() {
        return this.descricao;
    }

    setDescricao(novaDescricao) {
        this.descricao = novaDescricao;
    }
}

module.exports = Exercicio;
