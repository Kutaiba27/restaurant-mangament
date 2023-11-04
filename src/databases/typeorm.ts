
import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import UsersEntity from "./entity/users.entity";
import HotalEntity from "./entity/hotal.entity";
import RoomEntity from "./entity/room.entity";
import BookingEntity from "./entity/booking.entity";
import { AvailableEnitiy } from "./entity/available.entity";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let TypeORMDB: DataSource;

export default async function TyepORMConnection(): Promise<DataSource> {
   const appDataSource = new DataSource({
      type: "postgres",
      url: process.env.PG_URL,
      entities: [ UsersEntity, HotalEntity, RoomEntity, BookingEntity, AvailableEnitiy ],
      synchronize: true
   })
   TypeORMDB = await appDataSource.initialize()
   return TypeORMDB;
}

export function useTypeORM(entity: EntityTarget<ObjectLiteral>): Repository<ObjectLiteral> {
   if (!TypeORMDB) {
      throw new Error('TypeORM has not been initialized!');
   }
   return TypeORMDB.getRepository(entity);
}