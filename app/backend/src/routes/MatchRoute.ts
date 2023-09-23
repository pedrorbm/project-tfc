import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import verifyToken from '../middlewares/VerifyToken';

const matchesController = new MatchController();

const route = Router();

route.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

route.patch(
  '/:id/finish',
  verifyToken,
  (req: Request, res: Response) => matchesController.updateMatchProgress(req, res),
);

route.patch(
  '/:id',
  verifyToken,
  (req: Request, res: Response) => matchesController.updateMatchGoals(req, res),
);

route.post(
  '/',
  verifyToken,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default route;
