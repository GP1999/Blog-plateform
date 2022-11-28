import { Request } from "express";

export interface FreeObject {
  [keys: string]: any;
}

export interface AuthenticatedRequest extends Request{
    context:{
        userId?:string
    }
}