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

  async findById(id: number): Promise<IMatch | null> {
    const match = await this.model.findByPk(id);
    if (!match) return null;

    return match;
  }

  async updateProgressMatch(id: number): Promise<number | null> {
    const [affectedRows] = await this.model.update({ inProgress: false }, { where: { id } });
    if (affectedRows === 0) return null;

    return affectedRows;
  }
}
