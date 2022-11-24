import userRouter from "./services/userManagement/user.routes";
import { Express } from "express";


export default function applyRoutes(app:Express):void{

app.use('/api',[userRouter])


}