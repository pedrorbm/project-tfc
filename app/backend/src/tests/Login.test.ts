import * as sinon from 'sinon';
import * as chai from 'chai';
import UserSequelize from '../database/models/users/UserSequelize';
import LoginService from '../services/LoginService';
import { 
  User,
  loginInvalidEmail,
  loginInvalidPassword,
  loginNotEmail,
  loginNotPassword,
  messageInvalid,
  messageNot,
} from './mocks/LoginMock';
import jwt from '../utils/jwt';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste do endpoint /login', () => {
  it('Testando o POST /login, se retorna erro com o campo email inválido', async () => {
    const { status, body } = await chai.request(app).post('/login').send(loginInvalidEmail);

    expect(status).to.equal(401);
    expect(body).to.deep.equal(messageInvalid);
  });

  it('Testando o POST /login, se retorna erro com o campo password inválido', async () => {
    const { status, body } = await chai.request(app).post('/login').send(loginInvalidPassword);

    expect(status).to.equal(401);
    expect(body).to.deep.equal(messageInvalid);
  });

  it('Testando o POST /login, se retorna erro sem a chave email', async () => {
    const { status, body } = await chai.request(app).post('/login').send(loginNotEmail);

    expect(status).to.equal(400);
    expect(body).to.deep.equal(messageNot);
  });

  it('Testando o POST /login, se retorna erro sem a chave password', async () => {
    const { status, body } = await chai.request(app).post('/login').send(loginNotPassword);

    expect(status).to.equal(400);
    expect(body).to.deep.equal(messageNot);
  });

  afterEach(sinon.restore)
});
