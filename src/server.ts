// This file handles the startup of server

import express, { Express, Application, Request, Response } from 'express';

import dotenv from 'dotenv'
import body_parser from 'body-parser'

import { connectDB } from './config';
import { debuglog } from './helpers/debuglog';
import { router } from './routes';


const app: Application = express();

dotenv.config({ path: './../.env.local' })

const PORT = process.env.PORT || 8080;


// Remove this instance of app.listen()
// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

/* startup server */
connectDB(); //connect to database
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use('/api', router); // all api routes will follow 'https://localhost:PORT/api/ENDPOINTS' format
app.use(express.static('uploads'));
app.listen(PORT, (): void => {
    debuglog('LOG', 'server', `Server is listening on port ${PORT}`);
    console.log(`Server working on http://localhost:${PORT}`);
});
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the application!');
});
app.get('/api/test/:username', (req: Request, res: Response) => {
  res.send(`Welcome to the test route, ${req.params.username}!`);
});