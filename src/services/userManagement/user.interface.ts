import {Request,Response,NextFunction} from 'express'

export interface Routes{
    path:string
    handlers(req:Request,res:Response,next?:NextFunction):any
}
export interface signUpRequest {
  username:string
  password:string
  name:string
  phoneNumber:string
}