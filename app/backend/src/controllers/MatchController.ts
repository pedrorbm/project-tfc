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
}
