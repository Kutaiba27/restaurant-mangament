import { Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";
import {AuthPayloud} from "../dto/auth.dto";

export const Authorization = async (req:Request, res: Response, next: NextFunction)=>{
   const signature: string | undefined = req.get('Authorization')?.split(' ')[1]
   if(!signature){
      return res.status(401).json({message: "token is note defind"})
   }
   try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const payload: AuthPayloud  = verify(signature, process.env.JWT_SECRET)
      if(payload){
         req.user = payload
         next()
      }
   }catch (error){
      return res.status(401).json({message:"you are not authenticated"})
   }
}