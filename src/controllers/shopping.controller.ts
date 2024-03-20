import { Request, Response, NextFunction} from "express";
import {VindorModel, VindorDoc} from "../model/vindor.model";
import {FoodDoc} from "../model/food.model";

export const getFoodAvailability = async (req: Request,res:Response,next: NextFunction)=>{
   const pincode = req.params.pincode
   const resulte:VindorDoc[] = await VindorModel.find({pincode:pincode, serviceAvailable: true})
      .sort([['rating','descending']])
      .populate('foods')
   if(resulte.length > 0){
      return res.status(200).json(resulte)
   }
   return res.status(400).json({message: "Data Not Found"})
}
export const getTopRestaurant = async (req: Request,res:Response,next: NextFunction)=>{
   const pincode = req.params.pincode
   const resulte:VindorDoc[] = await VindorModel.find({pincode:pincode, serviceAvailable: true})
      .sort([['rating','descending']])
      .limit(5)
   if(resulte.length > 0){
      return res.status(200).json(resulte)
   }
   return res.status(400).json({message: "Data Not Found"})
}
export const getFoodIn30Min = async (req: Request,res:Response,next: NextFunction)=>{
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
}
export const searchFood = async (req: Request,res:Response,next: NextFunction)=>{

}
export const getRestaurant = async (req: Request,res:Response,next: NextFunction)=>{
   const restaurant: VindorDoc | null = await VindorModel.findById(req.params.id)
   if(!restaurant){
      return res.status(404).json({message : "there are no restaurant with this id"})
   }
   return res.status(200).json({data: restaurant})
}