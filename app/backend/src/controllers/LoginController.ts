import { Request, Response } from 'express';
import UserService from '../services/LoginService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LoginController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async loginValidate(req: Request, res: Response) {
    const { status, data } = await this.userService.findUser(req.body);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async loginValidateToken(req: Request, res: Response) {
    const token = req.header('authorization');
    const { status, data } = await this.userService.findRole(String(token));

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
