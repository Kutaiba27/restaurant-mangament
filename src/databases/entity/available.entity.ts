import {
   BaseEntity,
   Column,
   Entity,
   ManyToOne,
   PrimaryGeneratedColumn
} from "typeorm";
import { Available } from "../model/available.model";
import RoomEntity from "./room.entity";

@Entity("available")
export class AvailableEnitiy extends BaseEntity implements Available {
   @PrimaryGeneratedColumn({ type: "int", primaryKeyConstraintName: "id" })
   id!: number;

   @Column({ type: "date", name: "from", })
   from!: Date;

   @Column({ type: "date", name: "to" ,nullable:true })
   to!: Date;

   @ManyToOne(() => RoomEntity,(room=> room.id))
   room!: RoomEntity;
}