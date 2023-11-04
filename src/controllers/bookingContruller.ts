import BookingEntity from "../databases/entity/booking.entity";
import { Request, Response } from "express";
import { useTypeORM } from "../databases/typeorm";
import RoomEntity from "../databases/entity/room.entity";
import Booking from "../databases/model/booking.model";
import { DeleteResult, LessThan, ObjectLiteral } from "typeorm";
import { AvailableEnitiy } from "../databases/entity/available.entity";
import UsersEntity from "../databases/entity/users.entity";


const reservation  = async (req: Request, res: Response)=>{
   const { checkIn, checkOut, room, hotal } = req.body
   try {
      const booking:Booking =  new BookingEntity()
      booking.checkIn = checkIn;
      booking.checkOut = checkOut;
      booking.room = room;
      booking.hotal = hotal;
      booking.user = req.user.id;
      const available1 = new AvailableEnitiy()
      const available2 = new AvailableEnitiy()
      available1.to = new Date(checkIn)
      available1.room = room
      available2.from = new Date(checkOut)
      available2.room = room
      await available1.save()
      await available2.save()
      const saveBooking:ObjectLiteral = await useTypeORM(BookingEntity).save(booking)
      await useTypeORM(RoomEntity).update(room,{avilblity:false})
      res.status(200).json(saveBooking)
   } catch (error) {
      console.log(error)
   }
   
}

const cansel = async (req: Request, res: Response)=>{

   const idbooking = Number(req.params.idbooking) ;
   const userId = req.user.id
   try {
      const booking = await useTypeORM(BookingEntity).findOne({where:{id:idbooking}})
      if(!booking){
         return res.status(404).json({error:"this book is not available"})
      }
      const user:ObjectLiteral|null = await useTypeORM(UsersEntity).findOne({
         relations:{booking:true},
         where:{
            id:userId,
         },
         select:{
            id:true,
            booking:true
         }
      })
      user!.booking = user?.booking.filter( (book:BookingEntity) => book.id != idbooking)
      await user?.save()
      const result:DeleteResult = await useTypeORM(BookingEntity).delete({id:idbooking})
      if(!result.affected){
         return res.status(500).json({error:"there was an error deleting"})
      }
      return res.status(200).json({success:user})
   } catch (error) {
      console.log(error)
   }
}

const confirming = async (req:Request, res: Response)=>{
   try{
      const {bookingId,roomId} = req.query
      const booking:ObjectLiteral|null = await useTypeORM(BookingEntity).findOne({where:{id:bookingId}})
      await useTypeORM(AvailableEnitiy).delete({
         room:roomId,
         from:LessThan(booking?.checkOut)
      })
      const roomIdNumber = parseInt(roomId as string, 10);
      await useTypeORM(RoomEntity).update(roomIdNumber, { availability: true });
      res.status(200).json({success:"the opration is done"})      
   }catch(error){
      console.log(error)
   }
}

export { reservation, cansel, confirming }
