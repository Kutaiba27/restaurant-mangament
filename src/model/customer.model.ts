import {model, Schema, Document} from "mongoose";
import {OrderDoc} from "./order.model";
import {CartDoc} from "./cart.model";
export interface CustomerDoc extends Document{
   email: string;
   password: string
   salt: string;
   phone: string;
   firstName: string;
   lastName: string,
   address: string;
   verified: boolean;
   otp: number;
   otp_expire: Date
   lat: number;
   lng: number;
   orders: OrderDoc[]
   cart: CartDoc
}

const CustomerSchema:Schema<CustomerDoc> = new Schema<CustomerDoc>({
   email:{type: String, required: true},
   password: {type: String, required: true},
   salt: {type: String, required: true},
   phone: {type: String, required: true},
   firstName: {type: String, required: true},
   lastName: {type: String, required: true},
   address: {type: String},
   verified: {type: Boolean},
   otp: {type: Number, required: true},
   otp_expire: {type: Date, required: true},
   lat: {type: Number},
   lng: {type: Number},
   orders: [{
      type: Schema.Types.ObjectId,
      ref: "order"
   }],
   cart:{
      type: Schema.Types.ObjectId,
      ref: "cart"
   }
},
   {
      timestamps: true,
      toJSON: {
         transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.createAt;
            delete ret.updatedAt;
         }
      }
   })

export const CustomerModel = model("customer",CustomerSchema)