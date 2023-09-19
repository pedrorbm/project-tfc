import { Router } from 'express';
import teamRoute from './TeamRoutes';

const route = Router();

route.use('/teams', teamRoute);

export default route;
