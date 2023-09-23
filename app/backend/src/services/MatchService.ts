import { Message } from '../types/Token';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatch from '../Interfaces/matches/IMatch';
import IMatchModel from '../Interfaces/matches/IMatchModel';
import MatchModel from '../database/models/matches/MatchModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
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

  public async updateMatch(id: number): Promise<ServiceResponse<Message>> {
    const match = await this.matchModel.findById(id);
    if (!match) return { status: 'NOT_FOUND', data: { message: 'Partida não existe' } };
    await this.matchModel.updateProgressMatch(id);

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
