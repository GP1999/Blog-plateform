
import { Express ,json,urlencoded} from "express";
export default function applyMiddleware(app:Express):void{

    app.use(json())
    app.use(urlencoded({ extended: false }));
}