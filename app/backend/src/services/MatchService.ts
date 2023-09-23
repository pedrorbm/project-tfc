import { Message } from '../types/Token';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatch from '../Interfaces/matches/IMatch';
import IMatchModel from '../Interfaces/matches/IMatchModel';
import MatchModel from '../database/models/matches/MatchModel';
import { UpdateMatch } from '../types/UpdateMatch';
import { CreateMatch } from '../types/CreateMatch';
import TeamModel from '../database/models/teams/TeamModel';
import ITeamModel from '../Interfaces/teams/ITeamModel';

const messageMatchNotExist = { message: 'Partida não existe' };

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllMatches(progress?: unknown): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();

    if (progress === 'true') {
      const data = matches.filter(({ inProgress }) => inProgress === true);

      return { status: 'SUCCESSFUL', data };
    }

    if (progress === 'false') {
      const data = matches.filter(({ inProgress }) => inProgress === false);

      return { status: 'SUCCESSFUL', data };
    }

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async updateMatchProgress(id: number): Promise<ServiceResponse<Message>> {
    const match = await this.matchModel.findById(id);
    if (!match) return { status: 'NOT_FOUND', data: messageMatchNotExist };
    await this.matchModel.updateMatchProgress(id);

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatchGoals(id: number, object: UpdateMatch):
  Promise<ServiceResponse<IMatch>> {
    const match = await this.matchModel.findById(id);
    if (!match) return { status: 'NOT_FOUND', data: messageMatchNotExist };
    const updateGoals = await this.matchModel.updateMatchGoals(id, object);
    if (!updateGoals) return { status: 'NOT_FOUND', data: messageMatchNotExist };

    return { status: 'SUCCESSFUL', data: updateGoals };
  }

  public async createMatch(object: CreateMatch): Promise<ServiceResponse<IMatch | Message>> {
    const { homeTeamId, awayTeamId } = object;
    const create = await this.matchModel.createMatch(object);
    const teamOne = await this.teamModel.findById(homeTeamId);
    const teamTwo = await this.teamModel.findById(awayTeamId);

    if (!teamOne || !teamTwo) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    if (teamOne.teamName === teamTwo.teamName) {
      return { status: 'UNPROCESSABLE',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    return { status: 'CREATED', data: create };
  }
}
