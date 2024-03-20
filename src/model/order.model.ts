import {Schema,model,Document} from "mongoose";
import {VindorDoc} from "./vindor.model";
import { CartDoc } from "./cart.model";


export enum Status{
   WATTING,
   FAILD,
   READY,
   ACCEPT,
   REJACT
}

export interface OrderDoc extends Document {
   cart:CartDoc;
   vindorId:VindorDoc;
   totalPrice: number;
   orderDate: Date;
   paidBy: string;
   paymentResponse: string;
   orderStatus: string;
   deliveryId:number;
   readyTime:number;
   remarks:string;
}

const OrderSchema:Schema<OrderDoc> = new Schema<OrderDoc>({
   cart:{
      type: Schema.Types.ObjectId,
      ref: "cart"
   },
   totalPrice: {
      type: Number,
      required: true,
   },
   orderDate: {
      type: Date,
      required:true
   },
   paidBy: {
      type:String,
      required:true
   },
   paymentResponse:{
      type:String,
      required:true
   },
   orderStatus:{
      type:String,
      required:true
   },
   vindorId:{
      type:Schema.Types.ObjectId,
      ref: 'vindor',
   },
   deliveryId:{type:Number},
   readyTime:{type:Number},
   remarks:{type:String}

},{
   toJSON:{
      transform(doc,ret){
         delete ret.__v
         delete ret.createAt
         delete ret.updateAt
      }
   },
   timestamps:true
})

export const OrderModel = model('order',OrderSchema)