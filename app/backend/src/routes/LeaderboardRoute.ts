import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
// import verifyToken from '../middlewares/VerifyToken';

const leaderboardController = new LeaderboardController();

const route = Router();

route.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getLeaderboardHome(req, res),
);

route.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getLeaderboardAway(req, res),
);

export default route;
