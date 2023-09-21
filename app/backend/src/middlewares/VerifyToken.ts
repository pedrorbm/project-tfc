import { Request, Response, NextFunction } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import jwt from '../utils/jwt';

function extractToken(bearerToken: string) {
  return bearerToken.split(' ')[1];
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('authorization');

  if (!token) {
    return res.status(mapStatusHTTP('UNAUTHORIZED'))
      .json({ message: 'Token not found' });
  }

  try {
    jwt.jwtVerify(extractToken(token));

    next();
  } catch (error) {
    return res.status(mapStatusHTTP('UNAUTHORIZED'))
      .json({ message: 'Token must be a valid token' });
  }
};

export default verifyToken;
