import { Router } from 'express';
import teamRoute from './TeamRoute';
import loginRoute from './LoginRoute';
import matchRoute from './MatchRoute';
import leaderboardRoute from './LeaderboardRoute';

const route = Router();

route.use('/teams', teamRoute);

route.use('/login', loginRoute);

route.use('/matches', matchRoute);

route.use('/leaderboard', leaderboardRoute);

export default route;
