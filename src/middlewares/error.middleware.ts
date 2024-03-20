import {ApiError} from "../utility/apierror";
import {Response,Request} from "express";

const sendErrorForDev = (error:ApiError,req:Request, res:Response)=>
   res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      error: error,
      stack: error.stack
   })

const sendErrorForProd = (error:ApiError,req:Request, res:Response)=>
   res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
   })

export const globalError = (error: ApiError,req:Request,res:Response)=>{
   error.statusCode = error.statusCode || 500;
   error.status = error.status || "error"
   if(process.env.ENV === "development"){
      return sendErrorForDev(error,req,res)
   }
   return sendErrorForProd(error,req,res)
}