
import { Response, Request } from "express";
import HotalEntity from "../databases/entity/hotal.entity";
import { useTypeORM } from "../databases/typeorm";
import { Between, ObjectLiteral } from "typeorm";
import { AvailableEnitiy } from "../databases/entity/available.entity";

const availaibleRoom = async (req: Request, res:Response)=>{
   try {
      const hotalId = req.query.hotalId
      const room = await useTypeORM(HotalEntity).findOne({
         relations:{
            room:true
         },
         select:{
            id:true,
            room:true
         },
         where:{
            id:hotalId,
            room:{
               avilblity:true
            }
         },
      })
      res.status(200).json({room:room})
   } catch (error) {
      res.json({Error:error})
   }
}

const availaibleRoomInCity = async (req: Request, res: Response)=>{
   try {
      const city = req.query.city
      const room = await useTypeORM(AvailableEnitiy).find({
         relations:{
            room:{
               hotal:true
            }
         },
         where:{
            room:{
               hotal:{
                  city:city
               }
            }
         },
         select:{
            room:{
               id: true,
               price: true,
               numberOfPeople: true,
               roomNumber: true,
               avilblity: true,
               image: true,
               hotal:{
                  id: true,
                  name: true,
                  countery: true,
                  city: true,
                  address: true,
                  type: true,
                  image:true
               }
            }
         }
      })
      res.status(200).json(room)
   } catch (error) {
      res.json({error})
   }
}

const roomPriceInCity = async (req: Request, res: Response)=>{
   try {
      const { city, min, max } = req.query
      console.log(city,typeof Number(min),max)
      const room = await useTypeORM(HotalEntity).find({
         relations:{
            room:true 
         },
         select:{
            name:true,
            room:true
         },
         where:{
            city:city,
            room:{
               price: Between(Number(min)||0,Number(max)||1000),
               avilblity:true
            }
         }
      })
      res.status(200).json({room})
   } catch (error) {
      res.json({error})
   }
}

const avaliable = async (req:Request, res:Response)=>{
   try {
      const avaliabl:AvailableEnitiy|null|ObjectLiteral = await useTypeORM(AvailableEnitiy).find({
         relations:{
            room:true
         },
         select:{
            id:true,
            room:{
               price:true,
               image:true
            }
         }
      })
      res.json(avaliabl)
   } catch (error) {
      console.log(error)
   }
}


export { availaibleRoom,
         availaibleRoomInCity,
         roomPriceInCity,
         avaliable }