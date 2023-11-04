import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Room from "../model/room.model";
import HotalEntity from "./hotal.entity";
import { AvailableEnitiy } from "./available.entity";
// import { AvailableEnitiy } from "./available.entity";

@Entity("room")
export default class RoomEntity extends BaseEntity implements Room {

   @PrimaryGeneratedColumn({})
   id!:number;

   @Column({nullable:true,default:0})
   price!: number;

   @Column({nullable:true,default:0})
   numberOfPeople!: number;

   @Column({nullable:true,default:0})
   roomNumber!: number;

   @Column({default:false})
   avilblity!: boolean;

   @Column({type:"simple-array",nullable:true})
   image!: [string];

   @ManyToOne(()=>HotalEntity)
   @JoinColumn({name: "hotal_id", referencedColumnName:"id"})
   hotal!: HotalEntity;

   @ManyToOne(()=>AvailableEnitiy,(avaliable)=>avaliable.room)
   available!: AvailableEnitiy;
   
}