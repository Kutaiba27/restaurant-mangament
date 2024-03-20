import {Schema, model, Document} from "mongoose";
import {CustomerDoc} from "./customer.model";
import {FoodDoc} from "./food.model";
import {VindorDoc} from "./vindor.model";

export interface CartDoc extends Document {
   items:[{
      food:FoodDoc,
      unit:number,
      price:number
   }];
   totalPrice:number;
   customer:CustomerDoc;
   vindorId:VindorDoc;
}

const CartSchema:Schema<CartDoc> = new Schema<CartDoc>({
   items:[{
      food:{
         type: Schema.Types.ObjectId,
         ref: 'food',
      },
      unit:{ type:Number },
      price:{ type:Number}
   }],
   totalPrice:{type:Number},
   customer:{
      type: Schema.Types.ObjectId,
      ref: "customer"
   },
   vindorId:{
      type: Schema.Types.ObjectId,
      ref: 'vindor'
   }
})

export const CartModel = model("cart",CartSchema)