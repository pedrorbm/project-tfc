import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import loginVerify from '../middlewares/LoginVerify';
import verifyToken from '../middlewares/VerifyToken';

const loginController = new LoginController();

const route = Router();

route.post(
  '/',
  loginVerify,
  (req: Request, res: Response) => loginController.loginValidate(req, res),
);

route.get(
  '/role',
  verifyToken,
  (req: Request, res: Response) => loginController.loginValidateToken(req, res),
);

export default route;
