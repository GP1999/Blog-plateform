
import { Express ,json,urlencoded} from "express";
export default function applyMiddleware(app:Express){

    app.use(json())
    app.use(urlencoded({ extended: false }));
}