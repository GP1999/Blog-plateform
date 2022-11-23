import {NextFunction, Request,Response} from 'express'
export default function handleError(error:any,_request:Request,response:Response,_next:NextFunction){
    console.error("Error handler",error)
    const errorResponse={
        code:error.code,
        message:error.message,
        httpStatusCode:error.httpStatusCode
    }
    if(error.httpStatusCode){

        response.status(error.httpStatusCode).send(errorResponse);
    }else{
          errorResponse.httpStatusCode=500
          errorResponse.message = 'INTERNAL SERVER ERROR';
          errorResponse.code ='ISE'
        response.status(500).send(errorResponse);
    }
}