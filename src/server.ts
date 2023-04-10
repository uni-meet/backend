// This file handles the startup of server

import express, { Express, Application, Request, Response } from 'express';

import dotenv from 'dotenv'
import body_parser from 'body-parser'
dotenv.config({ path: './env.local' })
import { connectDB } from './config';
import { debuglog } from './helpers/debuglog';
import { router } from './routes';
const app: Application = express();




const PORT: any = process.env.LOCALHOST || 8081;
/* startup server */
connectDB() //connect to database
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))
app.use('/api', router)  // all api routes will follow 'https://localhost:PORT/api/ENDPOINTS' format
app.use(express.static('uploads'))
app.listen(PORT, (): void => {
    debuglog('LOG', 'server', `Server is listening on port ${PORT}`)
    console.log('Server working on http://localhost:8081')
})





