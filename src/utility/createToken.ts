import { sign } from "jsonwebtoken";

export const createRefreshToken = (name: string, id: number): string=>{
   return sign({ name, id },process.env.REFRESH_TOKEN|| "this is refresh token",/*{expiresIn: "10s"}*/); 
}

export const createAccessToken = (name: string, id: number):string=>{
   return sign({userInfo: {name, id} },process.env.ACCESS_TOKEN||"this is access token",{expiresIn: "10s"})
}