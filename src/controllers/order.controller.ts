import {Response, Request} from "express"
import {OrderDoc, OrderModel} from "../model/order.model";
import {CustomerDoc, CustomerModel} from "../model/customer.model";
import {CartDoc, CartModel} from "../model/cart.model";
import asyncHandler from "express-async-handler";
import { ApiError } from "../utility/error/apierror";

export const createOrder = asyncHandler( async (req:Request,res:Response)=>{
      const cart:CartDoc = await CartModel.findById(req.params.cartId) as CartDoc
      const order:OrderDoc= await OrderModel.create({
         cart:cart,
         totalPrice:cart.totalPrice,
         orderDate:Date.now(),
         orderStatus:"waiting",
         paidBy:"COD",
         paymentResponse:"dfluat",
         vindorId:cart.vindorId
      })
      const customer:CustomerDoc = await CustomerModel.findById(req.user?._id) as CustomerDoc;
      customer.orders = [...customer.orders,order]
      await customer.save()
      res.status(200).json({data: order})
})

export const getOrders = asyncHandler(async (req:Request,res:Response)=>{
      const customer:CustomerDoc |null = await CustomerModel.findOne({_id:req.user?._id}).populate('orders')
      if(!customer) throw new ApiError("Customer not found", 404)
      const orders:OrderDoc[] = customer?.orders;
      res.status(200).json({data:orders})
})


export const getOrderById = asyncHandler(async (req:Request,res:Response)=>{
   const order:OrderDoc | null = await OrderModel.findById(req.params.id)
   if(!order) throw new ApiError( "Order not founddddd",404);
   res.status(200).json({data: order})
})
