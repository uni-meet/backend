// This file handles the startup of server
import dotenv from 'dotenv'
dotenv.config()
import express, { Express, Application, Request, Response } from 'express';


import body_parser from 'body-parser'

import { connectDB } from './config';
import { debuglog } from './helpers/debuglog';
import { router } from './routes';
import cors from 'cors';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import { GridFSBucketReadStream } from 'mongodb';

const app: Application = express();




const PORT: any = process.env.PORT || 8082; // change to port
/* startup server */
connectDB() // connect to database
app.use(body_parser.json())
app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
    })
);
app.use(body_parser.urlencoded({ extended: true }))
app.use('/api', router)  // all api routes will follow 'https://localhost:PORT/api/ENDPOINTS' format
app.use(express.static('uploads'))
app.listen(PORT, (): void => { // TODO: Study how to pass host
    debuglog('LOG', 'server', `Server is listening on port ${PORT}`)
    console.log('Server working on http://localhost:8082')
})
let gfs: Grid.Grid;
const conn: mongoose.Connection = mongoose.connection;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

interface GridFSFile {
    _id: any;
    length: number;
    chunkSize: number;
    uploadDate: Date;
    md5: string;
    filename: string;
    contentType: string;
    aliases: any;
    metadata: any;
  }

// Add a route to serve images
app.get('/uploads/:filename', (req, res) => {
    (gfs.files as any).findOne({ filename: req.params.filename }, (err: Error | null, file: GridFSFile | null) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists',
        });
      }
  
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read the image and pipe it to the response
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image',
        });
      }
    });
  });





