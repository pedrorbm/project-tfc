import IMatchModel from '../Interfaces/matches/IMatchModel';
import ITeamModel from '../Interfaces/teams/ITeamModel';
import TeamModel from '../database/models/teams/TeamModel';
import MatchModel from '../database/models/matches/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
// import ITeam from '../Interfaces/teams/ITeam';
import ITable from '../Interfaces/leaderboards/ITable';
import IMatch from '../Interfaces/matches/IMatch';

export default class LeaderboardService {
  private _tables: ITable[] = [];
  private _matchesFinish: IMatch[] = [];
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  private async matchFinish() {
    const matches = await this.matchModel.findAll();
    const filterFinish = matches.filter(({ inProgress }) => inProgress === false);

    this._matchesFinish = filterFinish;
  }

  private async homePoints(homeGoals: number, awayGoals: number) {
    await this.teamModel.findAll();

    if (homeGoals > awayGoals) return 3;

    if (homeGoals < awayGoals) return 0;

    return 1;
  }

  private async table() {
    const teams = await this.teamModel.findAll();

    const tables = teams.map((team) => ({
      name: team?.teamName,
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
  }

  private async classification() {
    this._tables.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;

      if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;

      if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;

      return b.goalsFavor - a.goalsFavor;
    });
  }

  private async homeTeam(match: IMatch) {
    await this.table();
    const { homeTeamId, homeTeamGoals, awayTeamGoals } = match;
    const team = await this.teamModel.findById(homeTeamId);

    const table = {
      name: team?.teamName,
      totalPoints: await this.homePoints(homeTeamGoals, awayTeamGoals),
      totalGames: 1,
      totalVictories: homeTeamGoals > awayTeamGoals ? 1 : 0,
      totalDraws: homeTeamGoals === awayTeamGoals ? 1 : 0,
      totalLosses: homeTeamGoals < awayTeamGoals ? 1 : 0,
      goalsFavor: homeTeamGoals,
      goalsOwn: awayTeamGoals,
      goalsBalance: homeTeamGoals - awayTeamGoals,
      efficiency: '0',
    };

    return { table, name: team?.teamName };
  }

  public async homeTeamResult(): Promise<ServiceResponse<ITable[]>> {
    await this.matchFinish();
    this._matchesFinish.forEach(async (match) => {
      const homeTeam = await this.homeTeam(match);

      const stats = this._tables.find(({ name }) => name === homeTeam.name);
      if (!stats) return null;

      stats.totalPoints += homeTeam.table.totalPoints;
      stats.totalGames += homeTeam.table.totalGames;
      stats.totalVictories += homeTeam.table.totalVictories;
      stats.totalDraws += homeTeam.table.totalDraws;
      stats.totalLosses += homeTeam.table.totalLosses;
      stats.goalsFavor += homeTeam.table.goalsFavor;
      stats.goalsOwn += homeTeam.table.goalsOwn;
      stats.goalsBalance = stats.goalsFavor - stats.goalsOwn;
      stats.efficiency = ((stats.totalPoints / (stats.totalGames * 3)) * 100).toFixed(2);
    });

    await this.classification();

    return { status: 'SUCCESSFUL', data: this._tables };
  }

  private async awayPoints(awayGoals: number, homeGoals: number) {
    await this.teamModel.findAll();

    if (awayGoals > homeGoals) return 3;

    if (awayGoals < homeGoals) return 0;

    return 1;
  }

  private async awayTeam(match: IMatch) {
    await this.table();
    const { awayTeamId, homeTeamGoals, awayTeamGoals } = match;
    const team = await this.teamModel.findById(awayTeamId);

    const table = {
      name: team?.teamName,
      totalPoints: await this.awayPoints(awayTeamGoals, homeTeamGoals),
      totalGames: 1,
      totalVictories: awayTeamGoals > homeTeamGoals ? 1 : 0,
      totalDraws: awayTeamGoals === homeTeamGoals ? 1 : 0,
      totalLosses: awayTeamGoals < homeTeamGoals ? 1 : 0,
      goalsFavor: awayTeamGoals,
      goalsOwn: awayTeamGoals,
      goalsBalance: awayTeamGoals - homeTeamGoals,
      efficiency: '0',
    };

    return { table, name: team?.teamName };
  }

  public async awayTeamResult(): Promise<ServiceResponse<ITable[]>> {
    await this.matchFinish();
    this._matchesFinish.forEach(async (match) => {
      const awayTeam = await this.awayTeam(match);

      const stats = this._tables.find(({ name }) => name === awayTeam.name);
      if (!stats) return null;

      stats.totalPoints += awayTeam.table.totalPoints;
      stats.totalGames += awayTeam.table.totalGames;
      stats.totalVictories += awayTeam.table.totalVictories;
      stats.totalDraws += awayTeam.table.totalDraws;
      stats.totalLosses += awayTeam.table.totalLosses;
      stats.goalsFavor += awayTeam.table.goalsFavor;
      stats.goalsOwn += awayTeam.table.goalsOwn;
      stats.goalsBalance = stats.goalsFavor - stats.goalsOwn;
      stats.efficiency = ((stats.totalPoints / (stats.totalGames * 3)) * 100).toFixed(2);
    });

    await this.classification();

    return { status: 'SUCCESSFUL', data: this._tables };
  }
}
