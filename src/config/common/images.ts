/**
 * @fileoverview images.ts
 * This is the configuration file for storing images to the MongoDB
 */

// import dependencies
import { Connection, connection } from "mongoose";
import { debuglog } from "./";
import { GridFsStorage } from "multer-gridfs-storage/lib/gridfs";
import multer from "multer";




// import env variables
const username: string = process.env.MONGOATLAS_USERNAME
const password: string = process.env.MONGOATLAS_PASSWORD
const cluster: string = process.env.MONGOATLAS_CLUSTER



const url: string = `mongodb+srv://${username}:${password}@${cluster}${options}`;
const storage = new GridFsStorage({
    url: url,
    file: (req, file) => {
        return {
            bucketName:'images00',
            filename: new Date().toISOString() + file.originalname
        }
    }
})
export const upload = multer({
    storage: storage
})
