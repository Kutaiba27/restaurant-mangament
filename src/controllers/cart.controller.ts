import {Request,Response,NextFunction} from "express";
import {CartDoc, CartModel} from "../model/cart.model";
import {CustomerDoc, CustomerModel} from "../model/customer.model";
import {ApiError} from "../utility/apierror";
import {CartInput} from "../dto/cart.dto";
import {FoodDoc, FoodModel} from "../model/food.model";

export const addItemToCart = async (req:Request,res:Response,next:NextFunction)=>{
   try{
      const cartInfo:CartInput = <CartInput>req.body;
      let totalPrice:number = 0.0;
      const customer:CustomerDoc = await CustomerModel.findById(req.user?._id as string).populate('cart') as CustomerDoc;
      if(customer.cart){
         const cart: CartDoc = await customer.cart.populate({ path: 'items.food'});
         const exstingFood:number = cart.items.findIndex(item=> item.food.id == cartInfo.id)
         if(exstingFood>-1){
            const item = cart.items[exstingFood]
            totalPrice = cart.totalPrice
            item.unit +=  cartInfo.unit
            totalPrice -= item.price
            item.price = item.unit*item.food.price
            totalPrice += item.price
            cart.totalPrice = totalPrice;
            cart.items[exstingFood]= item
            await cart.save();
            await customer.save()
            return res.status(200).json({cart})
         }
         const food:FoodDoc | null = await FoodModel.findById(cartInfo.id).populate('vindorId')
         if(!food) return res.status(404).json({message:"there are no food with this id"})
         const itemPrice =  food.price * cartInfo.unit
         totalPrice = cart.totalPrice
         totalPrice += itemPrice
         const item = {food:food._id,unit:cartInfo.unit,price:itemPrice}
         cart.items.push(item)
         cart.totalPrice = totalPrice;
         cart.vindorId = food.vindorId
         await cart.save();
         await customer.save()
         return res.status(200).json({cart})
      }
      const food:FoodDoc | null = await FoodModel.findById(cartInfo.id)
      if(!food) return next(new ApiError("the food not found",404))
      const itemPrice = food.price * cartInfo.unit
      totalPrice += itemPrice
      const cart:CartDoc = await CartModel.create({
         items:[{
            food: food._id,
            unit: cartInfo.unit,
            price: itemPrice
         }],
         totalPrice,
         customer: customer._id,
         vidorId: food.vindorId
      })
      customer.cart = cart
      cart.vindorId = food.vindorId
      await customer.save();
      return res.status(200).json({cart})
   }catch (e){
      next(e)
   }
}

export const deleteItem = async (req:Request, res:Response, next: NextFunction)=> {
   try{
      const customer: CustomerDoc = await CustomerModel.findById(req.user?._id as string).populate('cart') as CustomerDoc;
      const cart:CartDoc = await customer.cart.populate('items.food') 
      const indexItem:number = cart.items.findIndex(item=> item.food._id.toString() == req.params.id)
      console.log(indexItem)
      cart.totalPrice -= cart.items[indexItem].price
      cart.items.splice(indexItem,1)
      await cart.save()
      return res.status(200).json({cart})
   }catch (e) {
      next(e)
   }
}

export const deleteCart = async (req:Request, res:Response, )=>{
   try{
      const cart: CartDoc | null = await CartModel.findOneAndDelete({ customer: (req.user?._id as string)});      
      return res.status(200).json({message: cart})
   }catch (e) {
      res.status(400).json(e)
   }
}

export const getCart = async (req:Request, res:Response,)=>{
   try {
      const cart:CartDoc = await CartModel.findOne({customer:req.user?._id}).populate('items.food') as CartDoc
      res.status(200).json({message: cart})
   }catch (e) {
      res.status(400).json(e)
   }
}








