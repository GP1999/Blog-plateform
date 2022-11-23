
export default class ServiceError extends Error{
    httpStatusCode:number
    code:string
    message:string
    constructor(code:string,status:number,mesage:string){
        super(mesage)
        this.httpStatusCode=status
        this.code=code
        this.message=mesage
    }
}