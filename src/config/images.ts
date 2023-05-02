/**
 * @fileoverview images.ts
 * This is the configuration file for storing images to the MongoDB
 */

// import dependencies

import MulterGridfsStorage from "multer-gridfs-storage";


// import env variables


import multer from 'multer';
import { Request } from 'express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const GridFsStorage = require('multer-gridfs-storage');

const mongoURI = process.env.MONGO_CONNECTION_URI;

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req: Request, file: Express.Multer.File) => {
    return {
      filename: Date.now() + '-' + file.originalname,
    };
  },
});

const upload = multer({ storage });

export { upload };

