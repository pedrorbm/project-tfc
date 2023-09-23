import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const progress = req.query.inProgress;

    if (!progress) {
      const { status, data } = await this.matchService.getAllMatches();

      return res.status(mapStatusHTTP(status)).json(data);
    }

    const { status, data } = await this.matchService.getAllMatches(progress);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatchProgress(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.matchService.updateMatchProgress(Number(id));

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatchGoals(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.matchService.updateMatchGoals(Number(id), req.body);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;
    const object = { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true };
    const { status, data } = await this.matchService.createMatch(object);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
