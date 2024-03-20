import multer, { Field, FileFilterCallback, Multer } from 'multer';
import { Request } from 'express';

const initMulter: () => Multer = () => {
   const multerFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
      if (file.mimetype.split('/')[0] == 'image') {
         cb(null, true);
      } else {
         cb(null, false);
      }
   };
   const storage = multer.memoryStorage();
   const upload = multer({ storage: storage, fileFilter: multerFilter });
   return upload as Multer;
};

export const uploadSinglImage = (fileName: string )=> initMulter().single(fileName)
export const uploadMultiblImage = (feilds:Field[] )=> initMulter().fields(feilds)

