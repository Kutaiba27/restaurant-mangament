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
exports.getVindor = exports.getVinders = exports.createVinder = exports.findFood = exports.findCustomer = exports.findVindor = void 0;
const vindor_model_1 = require("../model/vindor.model");
const PasswordUtility_1 = require("../utility/PasswordUtility");
const customer_model_1 = require("../model/customer.model");
const food_model_1 = require("../model/food.model");
const findVindor = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        return yield vindor_model_1.VindorModel.findOne({ email: email });
    }
    else {
        return yield vindor_model_1.VindorModel.findOne({ _id: id });
    }
});
exports.findVindor = findVindor;
const findCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield customer_model_1.CustomerModel.findById(id);
});
exports.findCustomer = findCustomer;
const findFood = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield food_model_1.FoodModel.findById(id);
});
exports.findFood = findFood;
const createVinder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, ownerName, email, password, phone, foodType, pincode } = req.body;
    const vindor = yield (0, exports.findVindor)('', email);
    if (vindor) {
        return res.json({ message: "the vindor is existing wiht the email" });
    }
    const sultGenerated = yield (0, PasswordUtility_1.GenerateSult)();
    const passwordHashed = yield (0, PasswordUtility_1.GeneratePassword)(password, sultGenerated);
    const createVindor = yield vindor_model_1.VindorModel.create({
        name: name,
        email: email,
        ownerName: ownerName,
        password: passwordHashed,
        phone: phone,
        foodType: foodType,
        pincode: pincode,
        salt: 'vcvcvc,',
        coverImage: [],
        serviceAvailable: false,
        rating: 0,
        foods: []
    });
    return res.json({ Vindor: createVindor });
});
exports.createVinder = createVinder;
const getVinders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const vindors = yield vindor_model_1.VindorModel.find();
    if (vindors) {
        return res.json({ vindors });
    }
    return res.json({ message: "there are not vindors" });
});
exports.getVinders = getVinders;
const getVindor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const vindorId = req.params.id;
    const vindor = yield (0, exports.findVindor)(vindorId);
    if (vindor) {
        return res.json({ vindor });
    }
    return res.json({ message: "this vindorn is not exist" });
});
exports.getVindor = getVindor;
