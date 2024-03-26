"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodModel = void 0;
const mongoose_1 = require("mongoose");
const FoodSchema = new mongoose_1.Schema({
    vindorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "vindor"
    },
    name: { type: String, required: true },
    foodType: { type: String, required: true },
    discretion: { type: String, required: true },
    category: { type: String },
    rate: { type: Number },
    images: { type: [String] },
    price: { type: Number, require: true },
    readyTime: { type: Number }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret._v,
                delete ret.createdAt,
                delete ret.updatedAt;
        }
    }
});
exports.FoodModel = (0, mongoose_1.model)('food', FoodSchema);
