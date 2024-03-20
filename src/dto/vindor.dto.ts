export default interface CreateVindorDto {
   name: string;
   ownerName: string;
   email: string;
   foodType: [string];
   address: string;
   pincode: string;
   password: string;
   phone:string;
}

export interface UpdateVindorDto extends Partial<CreateVindorDto> {}



export interface VindorLoginDto {
   email: string;
   password:string;
}

export interface VindorPaylaod {
   _id:string;
   name:string;
   email:string;
   foodType:[string];
}