import mongoose, { Schema, Document } from 'mongoose'
import {OrderDoc} from "./order.model";
import { FoodDoc } from './food.model';

export interface VindorDoc extends Document {
   name: string;
   ownerName: string;
   email: string;
   foodType: [string];
   address: string;
   pincode: string;
   password: string;
   phone: string;
   salt: string;
   serviceAvailable: boolean;
   civerImage: [string];
   rating: number;
   foods: [FoodDoc];
   order:[OrderDoc]
}


const VindorSchema = new Schema<VindorDoc>({
   name: { type: String, required: true },
   ownerName: { type: String, required: true },
   email: { type: String, required: true },
   foodType: { type: [String] },
   address: { type: String },
   pincode: { type: String, },
   password: { type: String, required: true },
   phone: { type: String, required: true },
   salt: { type: String, required: true },
   serviceAvailable: { type: Boolean },
   civerImage: { type: [String] },
   rating: { type: Number },
   foods: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref:'food'
   }],
   order:[{
      type:Schema.Types.ObjectId,
      ref:'order'
   }]
}, {
   toJSON: {
      transform(doc,ret) {
         delete ret.password;
         delete ret.salt;
         delete ret.__v;
         delete ret.createAt;
         delete ret.updateAt;
      }
   },
   timestamps: true
})

const VindorModel = mongoose.model<VindorDoc>('vindor', VindorSchema)

export { VindorModel }
