import {Response, Request, NextFunction} from "express"
import {OrderDoc, OrderModel} from "../model/order.model";
import {CustomerDoc, CustomerModel} from "../model/customer.model";
import {CartDoc, CartModel} from "../model/cart.model";

export const createOrder = async (req:Request,res:Response,)=>{
   try{
      const cart:CartDoc = await CartModel.findById(req.params.cartId) as CartDoc
      console.log(cart)
      const order:OrderDoc= await OrderModel.create({
         cart:cart,
         totalPrice:cart.totalPrice,
         orderDate:Date.now(),
         orderStatus:"waiting",
         paidBy:"COD",
         paymentResponse:"dfluat",
         vindorId:cart.vindorId
      })
      console.log(req.user)
      const customer:CustomerDoc = await CustomerModel.findById(req.user?._id) as CustomerDoc;
      console.log("after create order",customer)
      customer.orders = [...customer.orders,order]
      await customer.save()
      res.status(200).json({data: order})
   }catch (e) {
      res.status(400).json(e)
   }
}
export const getOrders = async (req:Request,res:Response,)=>{
   try{
      const customer:CustomerDoc |null = await CustomerModel.findOne({_id:req.user?._id}).populate('orders')
      console.log(customer)
      if(!customer) return res.status(404).json({message:"user not found"})
      console.log(customer)
      const orders:OrderDoc[] = customer?.orders;
      res.status(200).json({data:orders})
   }catch (e) {
      res.status(400).json({e})
   }
}
export const getOrderById = async (req:Request,res:Response,next: NextFunction)=>{
   try{
      const order:OrderDoc | null = await OrderModel.findById(req.params.id)
      if(!order) return res.status(404).json({message:"order with this id not found"})
      res.status(200).json({data: order})
   }catch (e) {
      next(e)
   }
}
