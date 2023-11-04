
import RoomEntity from "../databases/entity/room.entity";
import { Request, Response } from "express";
import { validation, roomSchema, ValidationException } from "../utility/reqValidation";
import { useTypeORM } from "../databases/typeorm";
import { AvailableEnitiy } from "../databases/entity/available.entity";


const createRoom = async (req: Request, res: Response)=>{
   try {
      const newRoom =req.body
      validation(roomSchema,newRoom);
      let roo = new RoomEntity()
      roo = newRoom
      console.log(roo)
      const room = await useTypeORM(RoomEntity).save(roo);
      const available = new AvailableEnitiy()
      available.room = room;
      await available.save();
      res.status(201).json({room})
   } catch (error) {
      if(error instanceof ValidationException){
         const err =JSON.stringify(error.details)
         console.log("the error "+ JSON.parse(err)[0].message )
         res.json({Error:JSON.parse(err)[0].message})
      }
      res.json({error})
   }
}

const updateRoom = async (req:Request, res:Response)=> {
   try {
      const roomId = req.params.id
      const result = await useTypeORM(RoomEntity).update(roomId,req.body)
      res.json({result})
   } catch (error) {
      console.log(error)
   }
}


export { createRoom, updateRoom }