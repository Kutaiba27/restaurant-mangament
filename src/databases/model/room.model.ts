
import HotalEntity from "../entity/hotal.entity";

export default interface Room {
   price: number;
   numberOfPeople: number;
   roomNumber: number;
   avilblity: boolean;
   image:[string];
   hotal: HotalEntity
}