import { IsArray, IsMongoId, IsNumber, IsString } from "class-validator";

export class CreateFood {

   @IsMongoId()
   vindorId: string;

   @IsString()
   name: string ;

   @IsString()
   discretion: string;

   @IsString()
   foodType: string;

   @IsNumber()
   readyTime: number;

   @IsNumber()
   price: number;

   @IsNumber()
   rate: number;

   @IsArray()
   images: string[];
}