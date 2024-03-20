import {Schema, model, Document, Model} from "mongoose";

export interface TransactionDoc extends Document {
   customerId:string ;
   vindorId:string;
   orderId:string;
   orderValue:number;
   status:string;
   paymentMode:string;
   paymentResponse:string
}

const TransactionSchema:Schema<TransactionDoc> = new Schema<TransactionDoc>({

   customerId: String,
   vindorId:String,
   orderId:String,
   orderValue:Number,
   status:String,
   paymentMode:String,
   paymentResponse:String
},{
   toJSON:{
      transform(doc,ret){
         delete ret.__v
      }
   },
   timestamps:true
})

export const TransactionModel:Model<TransactionDoc> = model<TransactionDoc>("transaction",TransactionSchema)