import { IsArray, IsEmail, IsNumber, IsPhoneNumber, IsString, Length,IsOptional } from 'class-validator'
import { LoginCustomer } from './customer.dto';

export class CreateVindorDto  {
   @IsString()
   name: string;

   @IsString()
   ownerName: string;

   @Length(20,40)
   @IsEmail()
   email: string;

   @IsArray()
   foodType: [string];

   @IsString()
   address: string;

   @IsNumber()
   pincode: string;

   @IsString()
   @Length(8)
   password: string;

   @IsString()
   @IsPhoneNumber()
   phone:string;
}

export class UpdateVindorDto extends CreateVindorDto {
   @IsOptional()
   @IsString()
   name: string;

   @IsOptional()
   @IsString()
   ownerName: string;

   @IsOptional()
   @Length(20,40)
   @IsEmail()
   email: string;

   @IsOptional()
   @IsArray()
   foodType: [string];

   @IsOptional()
   @IsString()
   address: string;

   @IsOptional()
   @IsNumber()
   pincode: string;

   @IsOptional()
   @IsString()
   @Length(8)
   password: string;

   @IsOptional()
   @IsString()
   @IsPhoneNumber()
   phone:string;
}

export class VindorLoginDto extends LoginCustomer {}

export interface VindorPaylaod {
   _id:string;
   name:string;
   email:string;
   foodType:[string];
}