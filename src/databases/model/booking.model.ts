
import RoomEntity from "../entity/room.entity";
import HotalEntity from "../entity/hotal.entity";
import UsersEntity from "../entity/users.entity";

export default interface Booking {
   user: UsersEntity;
   id:number;
   checkIn:Date;
   checkOut:Date;
   room:RoomEntity;
   hotal:HotalEntity;
}