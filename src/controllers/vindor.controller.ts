/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { VirfyPassword } from "../utility/PasswordUtility";
import { findVindor } from "./admin.controller";
import {GeneratSignature} from "../utility/JWTUtility";
import {FoodModel, FoodDoc} from "../model/food.model";
import {CreateFood} from "../dto/food.dto";
import {UpdateVindorDto, VindorLoginDto} from "../dto/vindor.dto"
import {VindorModel, VindorDoc} from "../model/vindor.model";
import {OrderDoc, OrderModel} from "../model/order.model";
import { uploadMultiblImage, uploadSinglImage } from "../middlewares/multer.middleware";
import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { ApiError } from "../utility/error/apierror";
import validationDto from "../utility/validationDto";

export const uploudImageSingle = uploadSinglImage('image')
export const uploudImageMultibl = uploadMultiblImage([{name:'mainImage',maxCount:1},{name:"images",maxCount:5}])

export const LoginVindor = async(req: Request, res: Response, next: NextFunction) => {
   try{
      const vindorInfo = await validationDto<VindorLoginDto>(VindorLoginDto,req.body)
      const existingVindor = await findVindor('', vindorInfo.email)
      if (existingVindor) {
         const virfyPassword = VirfyPassword(vindorInfo.password, existingVindor.password)
         if (virfyPassword) {
            const token: string = GeneratSignature({
               _id: existingVindor._id,
               name: existingVindor.name,
               email: existingVindor.email,
               foodType :existingVindor.foodType
               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
               // @ts-expect-error
            },process.env.JWT_SECRET)
            res.cookie("token",token)
            return res.status(200).json({ message: "the user loged in" ,token})
         }
         return res.json({ message: "the password is not valid" })
      }
      return res.json({ message: "you are not loged successfuly" })
   }catch (error){
      return res.status(500).json({message:error})
   }
}

export const GetVindorProfile =async (req:Request, res:Response, next:NextFunction)=>{
   try{
      const vendor:VindorDoc | null = await VindorModel.findById(req.user?._id)
      if(!vendor){
         throw new ApiError("there are not vindor whit this id",404)
      }
      res.status(200).json({data: vendor})
   }catch(e){
      next(e)
   }
}

export const UpdateVindorProfile =async (req:Request, res:Response, next:NextFunction)=>{
      const vindorDate = <UpdateVindorDto>req.body
      const instatn = plainToInstance(UpdateVindorDto,vindorDate)
      const inputError: ValidationError[] = await validate(instatn, { validationError: { target: true } })
      if (inputError.length > 0) {
         return res.status(400).json({ message: inputError })
      }
      const vindor  = await VindorModel.updateOne(
         {_id: req.user?._id},
         vindorDate,
         {new: true}
         )
      res.status(201).json({message: "update successfully ", data: vindor})
}

export const UpdateVindorServes = async (req:Request, res:Response, next:NextFunction)=>{
   try{
      const vindor: VindorDoc = await findVindor(req.user?._id)
      if(!vindor){
         return res.status(404).json({message: "vindor not voind"})
      }
      vindor.serviceAvailable = !vindor.serviceAvailable
      await vindor.save()
      return res.status(200).json({vindor})
   }catch (error){
      return res.status(500).json({message:error})
   }
}

export const addFood = async (req: Request, res: Response, next: NextFunction)=>{
   try{
      const foodInfo = await validationDto<CreateFood>(CreateFood,req.body)
      const vendor:VindorDoc = await findVindor(req.user?._id)
      if(!vendor) return res.status(404).json({message: "vendor not found"})
      // const files = req.files as [Express.Multer.File]
      // const images: string[] = files.map((file:Express.Multer.File) => file.filename as string)
      foodInfo.images = req.body.images
      const newFood: FoodDoc = await FoodModel.create(foodInfo)
      vendor.foods.push(newFood)
      await vendor.save();
      res.status(200).json({newFood})
   }catch(e){
      next(e)
   }

}

export const getFood = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const food = await FoodModel.findById(req.params.id)
      if(!food) throw new ApiError("food not found",404)
      res.status(200).json({food})
   } catch (error) {
      next(error)
   }
}

export const getFoods = async (req: Request, res: Response, next:NextFunction) => {
   try {
      const foods = await FoodModel.find()
      if(foods) throw new ApiError("foods not found",404)
      res.status(200).json({foods})
   } catch (error) {
      next(error)
   }
}
//-----------------------------------Order---------------------------//
export const getCurrentOrders = async (req: Request, res: Response, next: NextFunction)=>{
   try {
      const order:OrderDoc[] = await OrderModel.find({vindorId:req.user?._id as string})
      if(order.length == 0) return res.status(404).json({message:"there are no order"})
      res.status(200).json({data:order})
   }catch (error) {
      next(error)
   }
}

export const getOrderDetail = async (req: Request, res: Response, next: NextFunction)=>{
   try{
      const order:OrderDoc | null = await OrderModel.findById(req.params.id)
      if(!order) return res.status(404).json({message:"there are no order with this id"})
      res.status(200).json({data:order})
   }catch (error) {
      next(error)
   }
}

export const processOrder = async (req: Request, res: Response, next: NextFunction)=>{
   const orderId:string  = req.params.id
   const { status, time, remark } = req.body
   const order:OrderDoc | null = await OrderModel.findById(orderId)
   if(!order) return res.status(404).json({message: "ther are no order with this id"})
   order.orderStatus = status
   order.remarks = remark
   order.readyTime = time
   await order.save()
   res.status(200).json({data:order})

}

//----------------------------------Offer-----------------------------//



