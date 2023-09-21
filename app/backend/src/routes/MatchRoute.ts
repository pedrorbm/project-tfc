import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchesController = new MatchController();

const route = Router();

route.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

export default route;
