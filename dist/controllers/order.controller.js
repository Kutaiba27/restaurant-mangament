"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const order_model_1 = require("../model/order.model");
const customer_model_1 = require("../model/customer.model");
const cart_model_1 = require("../model/cart.model");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const cart = yield cart_model_1.CartModel.findById(req.params.cartId);
        console.log(cart);
        const order = yield order_model_1.OrderModel.create({
            cart: cart,
            totalPrice: cart.totalPrice,
            orderDate: Date.now(),
            orderStatus: "waiting",
            paidBy: "COD",
            paymentResponse: "dfluat",
            vindorId: cart.vindorId
        });
        console.log(req.user);
        const customer = yield customer_model_1.CustomerModel.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        console.log("after create order", customer);
        customer.orders = [...customer.orders, order];
        yield customer.save();
        res.status(200).json({ data: order });
    }
    catch (e) {
        res.status(400).json(e);
    }
});
exports.createOrder = createOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const customer = yield customer_model_1.CustomerModel.findOne({ _id: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id }).populate('orders');
        console.log(customer);
        if (!customer)
            return res.status(404).json({ message: "user not found" });
        console.log(customer);
        const orders = customer === null || customer === void 0 ? void 0 : customer.orders;
        res.status(200).json({ data: orders });
    }
    catch (e) {
        res.status(400).json({ e });
    }
});
exports.getOrders = getOrders;
const getOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.OrderModel.findById(req.params.id);
        if (!order)
            return res.status(404).json({ message: "order with this id not found" });
        res.status(200).json({ data: order });
    }
    catch (e) {
        next(e);
    }
});
exports.getOrderById = getOrderById;
