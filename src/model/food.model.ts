import { Document, Schema, model } from "mongoose";
import { VindorDoc } from "./vindor.model";
export interface FoodDoc extends Document {
   vindorId: VindorDoc;
   name: string ;
   discretion: string;
   foodType: string;
   category: string;
   readyTime: number;
   price: number;
   rate: number;
   images: string[];
}

const FoodSchema:Schema<FoodDoc> = new Schema<FoodDoc>({
   vindorId: {
      type: Schema.Types.ObjectId,
      ref: "vindor"
   },
   name: {type: String, required: true},
   foodType: {type: String, required: true},
   discretion: {type: String, required: true},
   category: {type: String},
   rate: {type: Number},
   images: {type: [String]},
   price: {type: Number, require: true},
   readyTime: {type: Number}
},
   {
   timestamps: true,
   toJSON: {
      transform(doc, ret){
         delete ret._v,
         delete ret.createdAt,
         delete ret.updatedAt
      }
   }
})

export const FoodModel = model<FoodDoc>('food',FoodSchema)