import RoomEntity from "../entity/room.entity";


export default interface Hotal {
   name: string;
   countery: string;
   city: string;
   address: string;
   type: string;
   image: [string];
   rate: number;
   desciption: string;
   room:RoomEntity[]
}