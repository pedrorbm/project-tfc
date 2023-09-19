import * as sinon from 'sinon';
import * as chai from 'chai';
import TeamSequelize from '../database/models/TeamSequelize';
import { Team, Teams } from './mocks/TeamMock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste do endpoint /teams', () => {
  it('Testando o GET /teams, se retorna todos os times', async () => {
    sinon.stub(TeamSequelize, 'findAll').resolves(Teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(Teams);
  });

  it('Testando o GET /teams/:id, se retorna o time com o id correto', async () => {
    sinon.stub(TeamSequelize, 'findByPk').resolves(Team as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(Team);
  });

  it('Testando o GET /teams/:id, se caso o time não exista retorna um erro', async () => {
    sinon.stub(TeamSequelize, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Time não existe' });
  });

  afterEach(sinon.restore)
});
