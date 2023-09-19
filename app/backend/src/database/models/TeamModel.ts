import TeamSequelize from './TeamSequelize';
import ITeamModel from '../../Interfaces/teams/ITeamModel';
import ITeam from '../../Interfaces/teams/ITeam';

export default class TeamModel implements ITeamModel {
  private model = TeamSequelize;

  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();

    return teams.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    if (!team) return null;
    const { teamName } = team;

    return { id, teamName };
  }
}
