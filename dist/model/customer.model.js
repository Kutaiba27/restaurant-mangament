"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = void 0;
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    phone: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String },
    verified: { type: Boolean },
    otp: { type: Number, required: true },
    otp_expire: { type: Date, required: true },
    lat: { type: Number },
    lng: { type: Number },
    orders: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "order"
        }],
    cart: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "cart"
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.createAt;
            delete ret.updatedAt;
        }
    }
});
exports.CustomerModel = (0, mongoose_1.model)("customer", CustomerSchema);
