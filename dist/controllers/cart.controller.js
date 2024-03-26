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
exports.getCart = exports.deleteCart = exports.deleteItem = exports.addItemToCart = void 0;
const cart_model_1 = require("../model/cart.model");
const customer_model_1 = require("../model/customer.model");
const apierror_1 = require("../utility/apierror");
const food_model_1 = require("../model/food.model");
const addItemToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const cartInfo = req.body;
        let totalPrice = 0.0;
        const customer = yield customer_model_1.CustomerModel.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).populate('cart');
        if (customer.cart) {
            const cart = yield customer.cart.populate({ path: 'items.food' });
            const exstingFood = cart.items.findIndex(item => item.food.id == cartInfo.id);
            if (exstingFood > -1) {
                const item = cart.items[exstingFood];
                totalPrice = cart.totalPrice;
                item.unit += cartInfo.unit;
                totalPrice -= item.price;
                item.price = item.unit * item.food.price;
                totalPrice += item.price;
                cart.totalPrice = totalPrice;
                cart.items[exstingFood] = item;
                yield cart.save();
                yield customer.save();
                return res.status(200).json({ cart });
            }
            const food = yield food_model_1.FoodModel.findById(cartInfo.id).populate('vindorId');
            if (!food)
                return res.status(404).json({ message: "there are no food with this id" });
            const itemPrice = food.price * cartInfo.unit;
            totalPrice = cart.totalPrice;
            totalPrice += itemPrice;
            const item = { food: food._id, unit: cartInfo.unit, price: itemPrice };
            cart.items.push(item);
            cart.totalPrice = totalPrice;
            cart.vindorId = food.vindorId;
            yield cart.save();
            yield customer.save();
            return res.status(200).json({ cart });
        }
        const food = yield food_model_1.FoodModel.findById(cartInfo.id);
        if (!food)
            return next(new apierror_1.ApiError("the food not found", 404));
        const itemPrice = food.price * cartInfo.unit;
        totalPrice += itemPrice;
        const cart = yield cart_model_1.CartModel.create({
            items: [{
                    food: food._id,
                    unit: cartInfo.unit,
                    price: itemPrice
                }],
            totalPrice,
            customer: customer._id,
            vidorId: food.vindorId
        });
        customer.cart = cart;
        cart.vindorId = food.vindorId;
        yield customer.save();
        return res.status(200).json({ cart });
    }
    catch (e) {
        next(e);
    }
});
exports.addItemToCart = addItemToCart;
const deleteItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const customer = yield customer_model_1.CustomerModel.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b._id).populate('cart');
        const cart = yield customer.cart.populate('items.food');
        const indexItem = cart.items.findIndex(item => item.food._id.toString() == req.params.id);
        console.log(indexItem);
        cart.totalPrice -= cart.items[indexItem].price;
        cart.items.splice(indexItem, 1);
        yield cart.save();
        return res.status(200).json({ cart });
    }
    catch (e) {
        next(e);
    }
});
exports.deleteItem = deleteItem;
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const cart = yield cart_model_1.CartModel.findOneAndDelete({ customer: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id });
        return res.status(200).json({ message: cart });
    }
    catch (e) {
        res.status(400).json(e);
    }
});
exports.deleteCart = deleteCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const cart = yield cart_model_1.CartModel.findOne({ customer: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id }).populate('items.food');
        res.status(200).json({ message: cart });
    }
    catch (e) {
        res.status(400).json(e);
    }
});
exports.getCart = getCart;
