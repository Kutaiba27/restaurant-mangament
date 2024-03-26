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
exports.processOrder = exports.getOrderDetail = exports.getCurrentOrders = exports.getFoods = exports.getFood = exports.addFood = exports.UpdateVindorServes = exports.UpdateVindorProfile = exports.GetVindorProfile = exports.LoginVindor = exports.uploudImageMultibl = exports.uploudImageSingle = void 0;
const PasswordUtility_1 = require("../utility/PasswordUtility");
const admin_controller_1 = require("./admin.controller");
const JWTUtility_1 = require("../utility/JWTUtility");
const food_model_1 = require("../model/food.model");
const vindor_model_1 = require("../model/vindor.model");
const order_model_1 = require("../model/order.model");
const multer_middleware_1 = require("../middlewares/multer.middleware");
exports.uploudImageSingle = (0, multer_middleware_1.uploadSinglImage)('image');
exports.uploudImageMultibl = (0, multer_middleware_1.uploadMultiblImage)([{ name: 'mainImage', maxCount: 1 }, { name: "images", maxCount: 5 }]);
const LoginVindor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingVindor = yield (0, admin_controller_1.findVindor)('', email);
        if (existingVindor) {
            const virfyPassword = (0, PasswordUtility_1.VirfyPassword)(password, existingVindor.password);
            if (virfyPassword) {
                const token = (0, JWTUtility_1.GeneratSignature)({
                    _id: existingVindor._id,
                    name: existingVindor.name,
                    email: existingVindor.email,
                    foodType: existingVindor.foodType
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                }, process.env.JWT_SECRET);
                res.cookie("token", token);
                return res.status(200).json({ message: "the user loged in", token });
            }
            return res.json({ message: "the password is not valid" });
        }
        return res.json({ message: "you are not loged successfuly" });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.LoginVindor = LoginVindor;
const GetVindorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const vendor = yield vindor_model_1.VindorModel.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (!vendor) {
        throw new Error("there are not vindor whit this id");
    }
    res.status(200).json({ data: vendor });
});
exports.GetVindorProfile = GetVindorProfile;
const UpdateVindorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const vindorDate = req.body;
    console.log(vindorDate);
    const vindor = yield vindor_model_1.VindorModel.updateOne({ _id: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id }, vindorDate, { new: true });
    res.status(201).json({ message: "update successfully ", data: vindor });
});
exports.UpdateVindorProfile = UpdateVindorProfile;
const UpdateVindorServes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const vindor = yield (0, admin_controller_1.findVindor)((_c = req.user) === null || _c === void 0 ? void 0 : _c._id);
        if (!vindor) {
            return res.status(404).json({ message: "vindor not voind" });
        }
        vindor.serviceAvailable = !vindor.serviceAvailable;
        yield vindor.save();
        return res.status(200).json({ vindor });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.UpdateVindorServes = UpdateVindorServes;
const addFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const foodInput = req.body;
    const vendor = yield (0, admin_controller_1.findVindor)((_d = req.user) === null || _d === void 0 ? void 0 : _d._id);
    if (!vendor)
        return res.status(404).json({ message: "vendor not found" });
    // const files = req.files as [Express.Multer.File]
    // const images: string[] = files.map((file:Express.Multer.File) => file.filename as string)
    foodInput.images = req.body.images;
    const newFood = yield food_model_1.FoodModel.create(foodInput);
    vendor.foods.push(newFood);
    yield vendor.save();
    res.status(200).json({ newFood });
});
exports.addFood = addFood;
const getFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const food = yield food_model_1.FoodModel.findById(req.params.id);
    res.status(200).json({ food });
});
exports.getFood = getFood;
const getFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const foods = yield food_model_1.FoodModel.find();
    res.status(200).json({ foods });
});
exports.getFoods = getFoods;
//-----------------------------------Order---------------------------//
const getCurrentOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const order = yield order_model_1.OrderModel.find({ vindorId: (_e = req.user) === null || _e === void 0 ? void 0 : _e._id });
    if (order.length == 0)
        return res.status(404).json({ message: "there are no order" });
    res.status(200).json({ data: order });
});
exports.getCurrentOrders = getCurrentOrders;
const getOrderDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.OrderModel.findById(req.params.id);
    if (!order)
        return res.status(404).json({ message: "there are no order with this id" });
    res.status(200).json({ data: order });
});
exports.getOrderDetail = getOrderDetail;
const processOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const { status, time, remark } = req.body;
    const order = yield order_model_1.OrderModel.findById(orderId);
    if (!order)
        return res.status(404).json({ message: "ther are no order with this id" });
    order.orderStatus = status;
    order.remarks = remark;
    order.readyTime = time;
    yield order.save();
    res.status(200).json({ data: order });
});
exports.processOrder = processOrder;
//----------------------------------Offer-----------------------------//
