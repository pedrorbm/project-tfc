import MatchSequelize from './MatchSequelize';
import IMatchModel from '../../../Interfaces/matches/IMatchModel';
import IMatch from '../../../Interfaces/matches/IMatch';
import TeamSequelize from '../teams/TeamSequelize';
import { UpdateMatch } from '../../../types/UpdateMatch';

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

  async updateMatchProgress(id: number): Promise<number | null> {
    const [affectedRows] = await this.model.update({ inProgress: false }, { where: { id } });
    if (affectedRows === 0) return null;

    return affectedRows;
  }

  async updateMatchGoals(id: number, object: UpdateMatch): Promise<IMatch | null> {
    const { homeTeamGoals, awayTeamGoals } = object;
    const [affectedRows] = await this.model.update({ homeTeamGoals,
      awayTeamGoals }, { where: { id } });
    if (affectedRows === 0) return null;
    const match = this.findById(id);

    return match;
  }
}
