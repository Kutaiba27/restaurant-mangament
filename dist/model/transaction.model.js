"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const mongoose_1 = require("mongoose");
const TransactionSchema = new mongoose_1.Schema({
    customerId: String,
    vindorId: String,
    orderId: String,
    orderValue: Number,
    status: String,
    paymentMode: String,
    paymentResponse: String
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});
exports.TransactionModel = (0, mongoose_1.model)("transaction", TransactionSchema);
