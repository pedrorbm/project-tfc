import { Request, Response, NextFunction } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const loginVerify = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(mapStatusHTTP('INVALID_DATA'))
      .json({ message: 'All fields must be filled' });
  }

  const regex = /\S+@\S+\.\S+/;
  const testEmail = regex.test(email);

  if (!testEmail || password.length < 6) {
    return res.status(mapStatusHTTP('UNAUTHORIZED'))
      .json({ message: 'Invalid email or password' });
  }

  next();
};

export default loginVerify;
