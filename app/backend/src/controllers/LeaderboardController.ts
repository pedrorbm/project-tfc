import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getLeaderboardHome(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.homeTeamResult();

    return res.status(mapStatusHTTP(status)).json(data);
  }

  // public async getLeaderboardAway(req: Request, res: Response) {
  //   const { status, data } = await this.leaderboardService.awayTeamResult();

  //   return res.status(mapStatusHTTP(status)).json(data);
  // }
}
