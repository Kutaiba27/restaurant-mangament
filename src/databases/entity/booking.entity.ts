import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Booking from "../model/booking.model";
import UsersEntity from "./users.entity";
import RoomEntity from "./room.entity";
import HotalEntity from "./hotal.entity";

@Entity("booking")
export default class BookingEntity extends BaseEntity implements Booking {
   
   @PrimaryGeneratedColumn()
   id!:number;
   
   @Column({type:"date"})
   checkIn!: Date;
   
   @Column({type:"date"})
   checkOut!: Date;

   @ManyToOne(()=>UsersEntity,(user)=>user.booking)
   @JoinColumn({name:"userId"})
   user!: UsersEntity;

   @ManyToOne(()=>RoomEntity,{})
   @JoinColumn({name:"roomId",referencedColumnName:"id"})
   room!: RoomEntity;

   @ManyToOne(()=>HotalEntity)
   @JoinColumn({name:"hotalId",referencedColumnName:"id"})
   hotal!: HotalEntity;


} 