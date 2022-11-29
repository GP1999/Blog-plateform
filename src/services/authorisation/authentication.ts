import jwt from 'jsonwebtoken';
import {  Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../util/shared.interface';

export async function authenticate(
  request: AuthenticatedRequest,
  _response: Response,
  next: NextFunction,
) {
try{
    const accessToken = request.headers['accesstoken'] as string;
    const payload= jwt.verify(accessToken, process.env.JWT_TOKEN_SECRET) as jwt.JwtPayload;
     request.context={...request?.context,userId:payload?.userId}
     next()
}catch(error){
    next(error)
}


}
