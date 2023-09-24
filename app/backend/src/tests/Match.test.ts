import * as sinon from 'sinon';
import * as chai from 'chai';
import MatchSequelize from '../database/models/matches/MatchSequelize';
import { Matches, MatchNotProgress, MatchInProgress, MatchesProgress } from './mocks/MatchMock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste do endpoint /matches', () => {
  it('Testando o GET /matches, se retorna todos as partidas', async () => {
    sinon.stub(MatchSequelize, 'findAll').resolves(MatchesProgress as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(MatchesProgress);
  });

  afterEach(sinon.restore)

  it('Testando o GET /matches, se retorna todos as partidas finalizadas', async () => {
    sinon.stub(MatchSequelize, 'findAll').resolves(MatchesProgress as any);

    const { status, body } = await chai.request(app).get('/matches').query('inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(MatchNotProgress);
  });

  afterEach(sinon.restore)

  it('Testando o GET /matches, se retorna todos as partidas em progresso', async () => {
    sinon.stub(MatchSequelize, 'findAll').resolves(MatchesProgress as any);

    const { status, body } = await chai.request(app).get('/matches').query('inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(MatchInProgress);
  });

  afterEach(sinon.restore)
});
