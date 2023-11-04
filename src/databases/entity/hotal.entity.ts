
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Hotal from "../model/hotal.model";
import RoomEntity from "./room.entity";

export enum hotalType{
   BUSINESS="business",
   BUTIEK="butiek",
   APARTHOTELS="aparthotel",
   BUDGETHOTELS="budgethotels"

}

@Entity("hotal")
export default class HotalEntity extends BaseEntity implements Hotal {

@PrimaryGeneratedColumn()
id!:number ;

@Column()
name!: string;

@Column()
countery!: string;

@Column()
city!: string;

@Column()
address!: string;

@Column({type:"enum",enum:hotalType})
type!: string;

@Column({type:"simple-array",nullable:true})
image!: [string];

@Column({type: "numeric",nullable:true,default:0})
rate!: number;

@Column()
desciption!: string;

@OneToMany(()=>RoomEntity,room=>room.hotal)
room!:RoomEntity[];

}