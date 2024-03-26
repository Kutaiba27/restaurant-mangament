"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    items: [{
            food: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'food',
            },
            unit: { type: Number },
            price: { type: Number }
        }],
    totalPrice: { type: Number },
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "customer"
    },
    vindorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'vindor'
    }
});
exports.CartModel = (0, mongoose_1.model)("cart", CartSchema);
