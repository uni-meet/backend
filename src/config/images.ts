/**
 * @fileoverview images.ts
 * This is the configuration file for storing images to the MongoDB
 */

// import dependencies

import { GridFsStorage } from "multer-gridfs-storage/lib/gridfs";
import multer from "multer";

interface Env_variables  {
    name: string,

}


// import env variables
const username: string | undefined = process.env.MONGOATLAS_USERNAME
const password: string | undefined = process.env.MONGOATLAS_PASSWORD
const cluster: string | undefined = process.env.MONGOATLAS_CLUSTER



const url: string = `mongodb+srv://${username}:${password}@${cluster}`;
const storage = new GridFsStorage({
    url,
    file: (req, file) => {
        return {
            bucketName: 'images00',
            filename: new Date().toISOString() + file.originalname
        }
    }
})
export const upload = multer({
    storage
})
