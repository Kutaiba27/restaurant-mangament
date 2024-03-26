import {IsBoolean, IsDate, IsEmail,IsOptional, IsNumber, IsString, Length} from "class-validator";

export class CreateCustomerDto {

   @IsEmail()
   email:string;

   @Length(8,26)
   password:string;

   @IsString()
   phone:string;

   @IsString()
   firstName:string;

   @IsString()
   lastName:string;

   @IsDate()
   @IsOptional()
   otp_expire:Date;

   @IsNumber()
   @IsOptional()
   otp:number;

   @IsBoolean()
   @IsOptional()
   verified:boolean;

   @IsString()
   @IsOptional()
   address:string;

   @IsNumber()
   @IsOptional()
   lat: number;

   @IsNumber()
   @IsOptional()
   lng: number;

   @IsString()
   @IsOptional()
   salt: string;
}

export class EditCustomerDto extends CreateCustomerDto{
   @IsOptional()   
   @IsEmail()
   email:string;

   @IsOptional()
   @Length(8,26)
   password:string;

   @IsOptional()
   @IsString()
   phone:string;

   @IsOptional()
   @IsString()
   firstName:string;

   @IsOptional()
   @IsString()
   lastName:string;

}


export class LoginCustomer {
   @IsEmail()
   email:string;
   
   @IsString()
   @Length(8,26)
   password:string;
}
export interface CustomerPayload {
   _id: string;
   email: string;
   firstName: string;
   verified: boolean
}