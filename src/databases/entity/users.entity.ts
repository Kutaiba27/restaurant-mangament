import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Users from "../model/users.model";
import BookingEntity from "./booking.entity";

@Entity("users")
export default class UsersEntity extends BaseEntity implements Users{

   @PrimaryGeneratedColumn()
   id!:number;

   @Column({ type:"varchar", length:30 })
   name!:string;

   @Column({ type:"varchar", length:50, unique:true })
   email!: string;

   @Column({ type:"varchar" })
   password!: string 

   @Column({ type:"text",array:true, nullable:true })
   refreshToken!: string[];

   @OneToMany(()=> BookingEntity, (booking)=> booking.user)
   booking!: BookingEntity
}