// This file handles the startup of server
import dotenv from 'dotenv'
dotenv.config()
import express, { Express, Application, Request, Response } from 'express';

import body_parser from 'body-parser'

import { connectDB } from './config';
import { debuglog } from './helpers/debuglog';
import { router } from './routes';
import cors from 'cors';

const app: Application = express();

const PORT: any = process.env.PORT || 8082;

connectDB();
app.use(body_parser.json());
app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
    })
);
app.use(body_parser.urlencoded({ extended: true }));
app.use('/api', router);

app.get('/api/test', (req: Request, res: Response) => {
    res.send('Test route is working');
});

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the root URL');
});

app.listen(PORT, (): void => {
    debuglog('LOG', 'server', `Server is listening on port ${PORT}`);
    console.log('Server working on http://localhost:8082');
});




