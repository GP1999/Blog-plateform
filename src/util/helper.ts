import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { FreeObject } from './shared.interface';

export function createJwt(
  payload: FreeObject,
  expireAt: number | string,
): string {
  const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
    expiresIn: expireAt,
  });
  return token;
}

export function getHash(payload: string): string {
  const hash = crypto.createHash('sha256').update(payload).digest('hex');
  return hash;
}
