/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express"
import {VindorModel, VindorDoc} from "../model/vindor.model"
import { GeneratePassword, GenerateSult } from "../utility/PasswordUtility"
import {CustomerDoc, CustomerModel} from "../model/customer.model";
import {FoodDoc, FoodModel} from "../model/food.model";
import { CreateVindorDto } from "../dto/vindor.dto";
import validationDto from "../utility/validationDto";


export const findVindor = async (id: string | undefined, email?: string) => {
   if (email) {
      return await VindorModel.findOne({ email: email }) as VindorDoc
   } else {
      return await VindorModel.findOne({ _id: id }) as VindorDoc
   }
}

export const findCustomer = async (id:string):Promise<CustomerDoc>=>{
   return await CustomerModel.findById(id) as CustomerDoc
}

export const findFood = async (id:string):Promise<FoodDoc>=>{
   return await FoodModel.findById(id) as FoodDoc
}

export const createVinder = async (req: Request, res: Response) => {
   try{
      const vindorInfo:CreateVindorDto = await validationDto<CreateVindorDto>(CreateVindorDto,req.body)
      const sultGenerated = await GenerateSult()
      const passwordHashed = await GeneratePassword(vindorInfo.password, sultGenerated)
      vindorInfo.password = passwordHashed
      const createVindor = await VindorModel.create(vindorInfo)
      return res.json({ Vindor: createVindor })
   }catch(e){
      res.status(400).json({e})
   }

}

export const getVinders = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const vindors = await VindorModel.find()
      if (vindors) {
         return res.json({vindors})
      }
   } catch (error) {
      return res.json({message:"there are not vindors"})
   }
}

export const getVindor = async (req: Request, res: Response, next: NextFunction) => {

   const vindorId = req.params.id;
   const vindor = await findVindor(vindorId)
   if (vindor) {
      return res.json({vindor})
   }
   return res.json({message:"this vindorn is not exist"})
}


