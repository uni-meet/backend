/**
 * @fileoverview images.ts
 * This is the configuration file for storing images to the MongoDB
 */

// import dependencies

import { RequestHandler } from 'express';
import multer from "multer";
import MulterGridfsStorage from "multer-gridfs-storage";


// import env variables


const url: any = process.env.MONGODB_URI;
const storage = new MulterGridfsStorage({
    url,
    file: (req: any, image: any) => {
        return {
            bucketName: 'fs',
            filename: new Date().toISOString() + image.originalname
        }
    }
})
export const upload = (multer({
    storage
}).single('image') as RequestHandler);
