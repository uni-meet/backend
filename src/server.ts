// This file handles the startup of server
import express, { Express, Application, Request, Response } from 'express';
import dotenv from 'dotenv'
import body_parser from 'body-parser'
import { connectDB } from './config/config';
import { debuglog } from './helpers/debuglog';
import { router } from './routes';
const app: Application = express();



dotenv.config({})




// const io = require("socket.io")(http)

const PORT: any = process.env || 8081;
/* startup server */
connectDB() //connect to database
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))
app.use('/api', router)  // all api routes will follow 'https://localhost:PORT/api/ENDPOINTS' format
app.use(express.static('uploads'))
app.listen(PORT, (): void => {
    debuglog('LOG', 'server', `Server is listening on port ${PORT}`)
})





