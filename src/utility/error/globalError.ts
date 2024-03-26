import {ApiError} from "./apierror";
import {Response,Request} from "express";

const sendErrorForDev = (error:ApiError,req:Request, res:Response)=>
   res.status(error.statusCode).json({
      status: error.status,
      message: "llllllllllllllllllll"+error.message,
      error: error,
      stack: error.stack
   })

const sendErrorForProd = (error:ApiError,req:Request, res:Response)=>
   res.status(error.statusCode).json({
      status: error.status,
      message: error.message+"ddddddddddddddddd",
   })

export const globalError = (error:any,req:Request,res:Response)=>{
   error.statusCode = error.statusCode || 500;
   error.status = error.status || "error"
   console.log("hekoooooooooooooooooooo")
   if(process.env.ENV === "development"){
      return sendErrorForDev(error,req,res)
   }
   return sendErrorForProd(error,req,res)
}