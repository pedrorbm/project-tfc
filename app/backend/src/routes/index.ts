import { Router } from 'express';
import teamRoute from './TeamRoute';
import loginRoute from './LoginRoute';

const route = Router();

route.use('/teams', teamRoute);
route.use('/login', loginRoute);

export default route;
