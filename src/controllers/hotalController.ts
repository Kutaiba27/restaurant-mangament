import { Request, Response } from "express"
import { useTypeORM } from "../databases/typeorm"
import HotalEntity from "../databases/entity/hotal.entity"
import { hotalSchema, validation, ValidationException  } from "../utility/reqValidation"


export class hotalController {

   static async createHotail (req:Request,res:Response) {
      const {
         name,
         country,
         city,
         address,
         type,
         image,
         desciption,
      }=req.body
      const hotalvalidation = {name,country,city,address,type,image,desciption,}
      try{
         validation(hotalSchema,hotalvalidation)
         const hotal = new HotalEntity()
         hotal.name = name;
         hotal.countery = country;
         hotal.city = city;
         hotal.address = address;
         hotal.type = type;
         hotal.image = image;
         hotal.desciption = desciption;
         const reslut = await useTypeORM(HotalEntity).save(hotal);
         res.status(201).json(reslut);
      }catch(error){
         if(error instanceof ValidationException){
            const err =JSON.stringify(error.details)
            console.log("the error "+ JSON.parse(err)[0].message )
            res.json({Error:JSON.parse(err)[0].message})
         }
         res.json({error})
      }
   }

   static async updateHotail(req: Request, res: Response){
      try {
         const idHotal = req.params.id
         const updateHotail = await useTypeORM(HotalEntity).update(idHotal,req.body);
         res.status(200).json(updateHotail);
      } catch (error) {
         res.json(error)
      }
   }

   static async nametHotal(req: Request, res: Response){
      const {name} = req.query
      try {
         const hotal =  await useTypeORM(HotalEntity).findBy({"name":name})
         res.status(200).json(hotal)
      } catch (error) {
         console.log(error)
      }
   }

   static async typeHotal(req: Request, res: Response){
      try {
         const type = req.query.type
         const hotal = await useTypeORM(HotalEntity).findBy({"type":type})
         res.status(200).json(hotal);
      } catch (error) {
         res.json(error);
      }
      
   }

}




