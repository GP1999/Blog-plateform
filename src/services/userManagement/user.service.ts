import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import { signUpDataValidate } from './user.helper';


export async function signUp(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    signUpDataValidate(request.body);
    const { username, password, name, phoneNumber } = request.body;
    const passwordHash = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    response.send({ passwordHash, username });
    return;
  } catch (error: any) {
    next(error);
  }
}

