import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamsController = new TeamController();

const route = Router();

route.get('/', (req: Request, res: Response) => teamsController.getAllTeams(req, res));

route.get('/:id', (req: Request, res: Response) => teamsController.getTeamById(req, res));

export default route;
