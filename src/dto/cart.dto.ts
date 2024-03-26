import { IsMongoId, IsNumber } from 'class-validator'
export class CartInputDto {

   @IsMongoId()
   id: string;

   @IsNumber()
   unit: number;
}