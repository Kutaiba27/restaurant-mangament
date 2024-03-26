"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.Status = void 0;
const mongoose_1 = require("mongoose");
var Status;
(function (Status) {
    Status[Status["WATTING"] = 0] = "WATTING";
    Status[Status["FAILD"] = 1] = "FAILD";
    Status[Status["READY"] = 2] = "READY";
    Status[Status["ACCEPT"] = 3] = "ACCEPT";
    Status[Status["REJACT"] = 4] = "REJACT";
})(Status || (exports.Status = Status = {}));
const OrderSchema = new mongoose_1.Schema({
    cart: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "cart"
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        required: true
    },
    paidBy: {
        type: String,
        required: true
    },
    paymentResponse: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        required: true
    },
    vindorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'vindor',
    },
    deliveryId: { type: Number },
    readyTime: { type: Number },
    remarks: { type: String }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret.createAt;
            delete ret.updateAt;
        }
    },
    timestamps: true
});
exports.OrderModel = (0, mongoose_1.model)('order', OrderSchema);
