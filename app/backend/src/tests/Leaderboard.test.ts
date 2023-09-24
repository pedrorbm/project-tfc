import * as sinon from 'sinon';
import * as chai from 'chai';
import MatchSequelize from '../database/models/matches/MatchSequelize';
import TeamSequelize from '../database/models/teams/TeamSequelize';
import { Matches } from './mocks/MatchMock';
import { Teams } from './mocks/TeamMock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste do endpoint /leaderboard', () => {
  it('Testando o GET /leaderboard/home, se retorna todos as partidas', async () => {
    sinon.stub(MatchSequelize, 'findAll').resolves(Matches as any);
    sinon.stub(TeamSequelize, 'findAll').resolves(Teams as any);

    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.equal(200);
    expect(body[0]).haveOwnProperty('name');
    expect(body[0]).haveOwnProperty('totalPoints');
    expect(body[0]).haveOwnProperty('totalGames');
    expect(body[0]).haveOwnProperty('totalVictories');
    expect(body[0]).haveOwnProperty('totalLosses');
    expect(body[0]).haveOwnProperty('goalsFavor');
    expect(body[0]).haveOwnProperty('goalsOwn');
    expect(body[0]).haveOwnProperty('goalsBalance');
    expect(body[0]).haveOwnProperty('efficiency');
  });

  afterEach(sinon.restore)

  it('Testando o GET /leaderboard/away, se retorna todos as partidas', async () => {
    sinon.stub(MatchSequelize, 'findAll').resolves(Matches as any);
    sinon.stub(TeamSequelize, 'findAll').resolves(Teams as any);

    const { status, body } = await chai.request(app).get('/leaderboard/away');

    expect(status).to.equal(200);
    expect(body[0]).haveOwnProperty('name');
    expect(body[0]).haveOwnProperty('totalPoints');
    expect(body[0]).haveOwnProperty('totalGames');
    expect(body[0]).haveOwnProperty('totalVictories');
    expect(body[0]).haveOwnProperty('totalLosses');
    expect(body[0]).haveOwnProperty('goalsFavor');
    expect(body[0]).haveOwnProperty('goalsOwn');
    expect(body[0]).haveOwnProperty('goalsBalance');
    expect(body[0]).haveOwnProperty('efficiency');
  });

  afterEach(sinon.restore)
});
