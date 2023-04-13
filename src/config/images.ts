/**
 * @fileoverview images.ts
 * This is the configuration file for storing images to the MongoDB
 */

// import dependencies


import multer from "multer";
import MulterGridfsStorage from "multer-gridfs-storage";


// import env variables
const username: string | undefined = process.env.MONGOATLAS_USERNAME
const password: string | undefined = process.env.MONGOATLAS_PASSWORD
const cluster: string | undefined = process.env.MONGOATLAS_CLUSTER



const url: string = `mongodb+srv://${username}:${password}@${cluster}`;
const storage = new MulterGridfsStorage({
    url,
    file: (req: any, file: any) => {
        return {
            bucketName: 'images00',
            filename: new Date().toISOString() + file.originalname
        }
    }
})
export const upload = multer({
    storage
})
