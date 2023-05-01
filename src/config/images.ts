import * as crypto from "crypto";
import { Request } from "express";
import mongoose from "mongoose";
import multer from "multer";


const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
// Create storage engine
const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    file: (req: Request, file: any) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const filename = file.originalname
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                }
                resolve(fileInfo)
            })
        })
    },
})
//Connect to DB


const mongoURI: any = process.env.MONGODB_URI;

const conn = mongoose.createConnection(mongoURI)

conn.once('open', () => {
    console.log('Connection Successful')
})
let gfs: { collection: (arg0: string) => void; files: { findOne: (arg0: { filename: string; }, arg1: (err: any, file: any) => any) => void; }; createReadStream: (arg0: any) => any; }

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
    console.log('Connection Successful')
})


// export function findImage (req: Request, res: Response) {

//     gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//         // Check if file
//         if (!file || file.length === 0) {
//             return res.status(404).json({
//                 err: 'No file exists',
//             })
//         }

//         // Check if image
//         if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
//             // Read output to browser
//             const readstream = gfs.createReadStream(file.filename)
//             readstream.pipe(res)
//         } else {
//             res.status(404).json({
//                 err: 'Not an image',
//             })
//         }
//     })
// }



// Export upload object
export const upload = multer({ storage })
