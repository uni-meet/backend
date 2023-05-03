/**
 * @fileoverview images.ts
 * This is the configuration file for storing images to the MongoDB
 */

// import dependencies

import MulterGridfsStorage from "multer-gridfs-storage";


// import env variables

import mongoose from "mongoose";
import multer from 'multer';
import { Request } from 'express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const GridFsStorage = require('multer-gridfs-storage');


const MONGODB_URI = "mongodb+srv://adminAll:adminAll@cluster0.mongodb.net/newDB?retryWrites=true&w=majority";
const conn = mongoose.createConnection(MONGODB_URI);

const storage = new GridFsStorage({
    url: MONGODB_URI,
    file: (req: Request, file: Express.Multer.File) => {
      return {
        bucketName: "uploads",
        filename: `${Date.now()}-${file.originalname}`,
      };
    },
  });

const upload = multer({ storage });

export { upload };

