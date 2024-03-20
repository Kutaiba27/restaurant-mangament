import sharp from "sharp";
import {v4 as uuid} from 'uuid'
import { Response,Request,NextFunction } from "express";

export const reSizeOndStor = (folderName:string)=> async (req:Request,res:Response,next:NextFunction)=>{
   // req.body.images= []
   if(req.files && 'mainImage' in req.files){
      const fileName = `${folderName}-${uuid}-${Date.now()}.jpeg`
      await sharp(req.files.mainImage[0].buffer)
      .resize(600,600)
      .toFormat('jpeg')
      .jpeg({quality:90})
      .toFile(`src/uploads/${folderName}/${fileName}`)
      .then((info)=>{
         console.log("for win imagggggggggggggggggggggggggggggggggggggggggggggggggggggggg",info)
         req.body.images.push(fileName)
      })
      .catch(err=> console.error(err))
   }
   if(req.files && 'images' in req.files){
      const fileName = `${folderName}-${uuid}-${Date.now()}.jpeg`
      await Promise.all(req.files.images.map(async(image)=>{
         await sharp(image.buffer)
      .resize(600,600)
      .toFormat('jpeg')
      .jpeg({quality:90})
      .toFile(`src/uploads/${folderName}/${fileName}`)
      .then((info)=>{
         console.log("for win imagggggggggggggggggggggggggggggggggggggggggggggggggggggggg",info)
         req.body.images.push(fileName)
      })
      }))
   } 
   next();
}