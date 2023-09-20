import { sign, verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  id: number,
  username: string,
};

function jwtSign(payload: TokenPayload): string {
  const token = sign(payload, secret);
  return token;
}

function jwtVerify(token: string): TokenPayload {
  const data = verify(token, secret) as TokenPayload;
  return data;
}

export default {
  jwtSign,
  jwtVerify,
};
