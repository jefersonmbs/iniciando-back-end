import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';

interface TokePayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  respose: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }
  const { secret } = auth.jwt;

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as TokePayload;

    request.user = {
      id: sub,
    };

    console.log(decoded);
    return next();
  } catch {
    throw new Error(' Invalid Token ');
  }
}
