import MatchSequelize from './MatchSequelize';
import IMatchModel from '../../../Interfaces/matches/IMatchModel';
import IMatch from '../../../Interfaces/matches/IMatch';
import TeamSequelize from '../teams/TeamSequelize';

export default class MatchModel implements IMatchModel {
  private model = MatchSequelize;

  async findAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [{ model: TeamSequelize, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamSequelize, as: 'awayTeam', attributes: ['teamName'] }],
    });

    return matches;
  }
}
