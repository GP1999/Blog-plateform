/* eslint-disable @typescript-eslint/no-empty-interface */
import { Request, Response, NextFunction } from 'express';

export interface Routes {
  path: string;
  handlers(req: Request, res: Response, next?: NextFunction): any;
}
export interface UserCreds {
  username: string;
  password: string;
}
export interface SignUpRequest extends UserCreds {
  name: string;
  phoneNumber: string;
}

