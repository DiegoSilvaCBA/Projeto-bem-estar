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

//Teste do Treino//
