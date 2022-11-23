import express from 'express';
import https from 'https';
import fs from 'fs';
import * as dotenv from 'dotenv';
import applyRoutes from './routes';
import applyMiddleware from './middlewares';
import handleError from './serviceError';
import App from './app';
dotenv.config();

const app = express();


applyMiddleware(app);
applyRoutes(app);

app.use(handleError)

const PORT = process.env.PORT || 3000;
const options = {
  key: fs.readFileSync('src/ssl/key.pem'),
  cert: fs.readFileSync('src/ssl/cert.pem'),
};

const server = https.createServer(options, app);
const serverApp = new App(server);
serverApp.listen(+PORT);
