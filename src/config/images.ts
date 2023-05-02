/**
 * @fileoverview images.ts
 * This is the configuration file for storing images to the MongoDB
 */

// import dependencies

import multer, { Multer } from "multer";
import MulterGridfsStorage from "multer-gridfs-storage";


// import env variables


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null, uniqueSuffix);
    },
  });
  
  export const upload = multer({ storage: storage });

