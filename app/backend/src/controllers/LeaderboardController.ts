import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getLeaderboardHome(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.teamHome();

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getLeaderboardAway(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.teamAway();

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
