declare module 'multer' {
    import { RequestHandler } from 'express';
    interface Multer {
      single(fieldname: string): RequestHandler;
      // Add other multer methods if needed
    }
    const multer: (options?: any) => Multer;
    export = multer;
  }