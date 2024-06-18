const request = require('supertest');
const app = require('./app');
//Teste do Cadastro//
describe('POST /cadastro', () => {
  it('Deve retornar 200 para um e-mail válido', async () => {
    const res = await request(app)
      .post('/cadastro')
      .send({ nome: 'Nome', email: 'email@example.com', senha: 'senha' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('valido', true);
  });

  it('Deve retornar 400 para um e-mail inválido', async () => {
    const res = await request(app)
      .post('cadastro')
      .send({ nome: 'Nome', email: 'email@invalid', senha: 'senha' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('valido', false);
  });
});

//Teste do Treino e Execicio//
describe('Exercicio API', () => {
  describe('POST /exercicio', () => {
    it('Deve criar um exercício com nome e descrição corretos', async () => {
      const res = await request(app)
        .post('/exercicio')
        .send({ nome: 'Flexões', descricao: 'Exercício para peito e tríceps' });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('nome', 'Flexões');
      expect(res.body).toHaveProperty('descricao', 'Exercício para peito e tríceps');
    });
  });

  describe('PUT /exercicio', () => {
    it('Deve atualizar a descrição de um exercício corretamente', async () => {
      // Primeiro cria o exercício
      await request(app)
        .post('/exercicio')
        .send({ nome: 'Flexões', descricao: 'Exercício para peito e tríceps' });

      // Em seguida, atualiza a descrição
      const res = await request(app)
        .put('/exercicio')
        .send({ descricao: 'Exercício para peito, tríceps e ombros' });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('descricao', 'Exercício para peito, tríceps e ombros');
    });

    it('Deve retornar 404 se o exercício não existir', async () => {
      const res = await request(app)
        .put('/exercicio')
        .send({ descricao: 'Nova descrição' });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error', 'Exercicio não encontrado');
    });
  });
});