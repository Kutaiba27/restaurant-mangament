/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express"
import {VindorModel, VindorDoc} from "../model/vindor.model"
import { GeneratePassword, GenerateSult } from "../utility/PasswordUtility"
import {CustomerDoc, CustomerModel} from "../model/customer.model";
import {FoodDoc, FoodModel} from "../model/food.model";
import { CreateVindorDto } from "../dto/vindor.dto";


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

   export const createVinder = async (req: Request, res: Response, next: NextFunction) => {
   const { name, ownerName, email, password, phone, foodType, pincode } = <CreateVindorDto>req.body
   const vindor:VindorDoc = await findVindor('',email)
   if (vindor) {
      return res.json({message:"the vindor is existing wiht the email"})
   }
   const sultGenerated = await GenerateSult()
   const passwordHashed = await GeneratePassword(password, sultGenerated)
   const createVindor = await VindorModel.create({
      name: name,
      email: email,
      ownerName: ownerName,
      password: passwordHashed,
      phone: phone,
      foodType: foodType,
      pincode: pincode,
      salt: 'vcvcvc,',
      coverImage: [],
      serviceAvailable: false,
      rating:0,
      foods: []
   })
   return res.json({ Vindor: createVindor })
}

export const getVinders = async (req: Request, res: Response, next: NextFunction) => {
   const vindors = await VindorModel.find()
   if (vindors) {
      return res.json({vindors})
   }
   return res.json({message:"there are not vindors"})
}

export const getVindor = async (req: Request, res: Response, next: NextFunction) => {

   const vindorId = req.params.id;
   const vindor = await findVindor(vindorId)
   if (vindor) {
      return res.json({vindor})
   }
   return res.json({message:"this vindorn is not exist"})
}


