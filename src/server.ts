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



const PORT: any = process.env.PORT || 8082; // change to port
/* startup server */
connectDB() // connect to database
app.use(body_parser.json())
app.use(
    cors()
);
app.use(body_parser.urlencoded({ extended: true }))
app.use('/api', router)  // all api routes will follow 'https://localhost:PORT/api/ENDPOINTS' format
app.use(express.static('uploads'))
app.listen(PORT, (): void => { // TODO: Study how to pass host
    debuglog('LOG', 'server', `Server is listening on port ${PORT}`)
    console.log('Server working on http://localhost:8082')
})





