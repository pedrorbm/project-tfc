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
}
