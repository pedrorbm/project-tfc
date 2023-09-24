import IMatchModel from '../Interfaces/matches/IMatchModel';
import ITeamModel from '../Interfaces/teams/ITeamModel';
import TeamModel from '../database/models/teams/TeamModel';
import MatchModel from '../database/models/matches/MatchModel';
import ITable from '../Interfaces/leaderboards/ITable';
import IMatch from '../Interfaces/matches/IMatch';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeam from '../Interfaces/teams/ITeam';

export default class LeaderboardService {
  private _tables: ITable[] = [];
  private _matchesFinish: IMatch[] = [];
  private _teams: ITeam[] = [];

  constructor(
    private teamsModel: ITeamModel = new TeamModel(),
    private matchesModel: IMatchModel = new MatchModel(),
  ) {}

  async classification() {
    this._tables.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;

      if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;

      if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;

      return b.goalsFavor - a.goalsFavor;
    });
  }

  async results(goalsTeamOne: number, goalsTeamTwo: number, position: number) {
    if (goalsTeamOne === goalsTeamTwo) {
      this._tables[position].totalDraws += 1;
      this._tables[position].totalPoints += 1;
    }

    if (goalsTeamOne > goalsTeamTwo) {
      this._tables[position].totalVictories += 1;
      this._tables[position].totalPoints += 3;
    }

    if (goalsTeamOne < goalsTeamTwo) {
      this._tables[position].totalLosses += 1;
    }

    this._tables[position].totalGames += 1;
    this._tables[position].goalsFavor += goalsTeamOne;
    this._tables[position].goalsOwn += goalsTeamTwo;
    this._tables[position].goalsBalance += goalsTeamOne - goalsTeamTwo;
    this._tables[position].efficiency = ((this._tables[position].totalPoints
      / (this._tables[position].totalGames * 3)) * 100).toFixed(2);
  }

  async table() {
    const teams = await this.teamsModel.findAll();

    this._teams = teams;

    const tables = teams.map((team) => ({
      name: team.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '0',
    }));

    this._tables = tables;

    const matches = await this.matchesModel.findAll();

    this._matchesFinish = matches.filter((match) => match.inProgress === false);
  }

  async teamHome(): Promise<ServiceResponse<ITable[]>> {
    await this.table();

    await Promise.all(
      this._matchesFinish.map(async (match) => {
        const teamHome = this._teams.find((team) => team.id === match.homeTeamId);

        const position = this._tables.findIndex((team) => team.name === teamHome?.teamName);

        await this.results(match.homeTeamGoals, match.awayTeamGoals, position);
      }),
    );

    await this.classification();

    return { status: 'SUCCESSFUL', data: this._tables };
  }

  async teamAway(): Promise<ServiceResponse<ITable[]>> {
    await this.table();

    await Promise.all(
      this._matchesFinish.map(async (match) => {
        const teamAway = this._teams.find((team) => team.id === match.awayTeamId);

        const position = this._tables.findIndex((team) => team.name === teamAway?.teamName);

        await this.results(match.awayTeamGoals, match.homeTeamGoals, position);
      }),
    );

    await this.classification();

    return { status: 'SUCCESSFUL', data: this._tables };
  }
}
