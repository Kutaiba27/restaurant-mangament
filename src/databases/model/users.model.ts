import BookingEntity from "../entity/booking.entity";

export default interface Users {
   name: string;
   email: string;
   password: string;
   refreshToken: string[];
   booking: BookingEntity
}