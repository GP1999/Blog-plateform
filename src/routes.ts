import userRouter from "./services/userManagement/user.routes";
import { Express } from "express";


export default function applyRoutes(app:Express){

app.use('/api',[userRouter])


}