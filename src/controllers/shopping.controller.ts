import { Request, Response, NextFunction} from "express";
import {VindorModel, VindorDoc} from "../model/vindor.model";
import {FoodDoc} from "../model/food.model";
import { ApiError } from "../utility/error/apierror";

export const getFoodAvailability = async (req: Request,res:Response,next: NextFunction)=>{
   try{
      const pincode = req.params.pincode
      const resulte:VindorDoc[] = await VindorModel.find({pincode:pincode, serviceAvailable: true})
         .sort([['rating','descending']])
         .populate('foods')
      if(resulte.length > 0){
         return res.status(200).json(resulte)
      }
      return res.status(400).json({message: "Data Not Found"})
   }catch(e){
      next(e)
   }
}

export const getTopRestaurant = async (req: Request,res:Response,next: NextFunction)=>{
   try{
      const pincode = req.params.pincode
      const resulte:VindorDoc[] = await VindorModel.find({pincode:pincode, serviceAvailable: true})
         .sort([['rating','descending']])
         .limit(5)
      if(resulte.length > 0){
         return res.status(200).json(resulte)
      }
      return res.status(400).json({message: "Data Not Found"})
   }catch(e){
      next(e);
   }

}

export const getFoodIn30Min = async (req: Request,res:Response,next: NextFunction)=>{
   try{
   const pincode = req.params.pincode
   const resulte:VindorDoc[] = await VindorModel.find({pincode:pincode, serviceAvailable: true})
      .populate('foods')
   if(resulte.length > 0){
      const foodResult: FoodDoc[] =[]
      resulte.forEach((vindor)=>{
         const foods = vindor.foods as FoodDoc[]
         foodResult.push(...foods.filter((food)=> food.readyTime <= 30))
      })
      return res.status(200).json(foodResult)
   }
   return res.status(400).json({message: "Data Not Found"})
   }catch(e){
      next(e)
   }
}

export const searchFood = async (req: Request,res:Response,next: NextFunction)=>{
   try{
      console.log(req,res)
   }catch(e){
      next(e)
   }
}

export const getRestaurant = async (req: Request,res:Response,next: NextFunction)=>{
   try{
      const restaurant: VindorDoc | null = await VindorModel.findById(req.params.id)
      if(!restaurant) throw new ApiError("No such restaurant found for id",404)
      return res.status(200).json({data: restaurant})
   }catch(e){
      next(e)
   }

}