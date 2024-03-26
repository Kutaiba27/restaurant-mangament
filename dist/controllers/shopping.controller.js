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
exports.getRestaurant = exports.searchFood = exports.getFoodIn30Min = exports.getTopRestaurant = exports.getFoodAvailability = void 0;
const vindor_model_1 = require("../model/vindor.model");
const getFoodAvailability = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const resulte = yield vindor_model_1.VindorModel.find({ pincode: pincode, serviceAvailable: true })
        .sort([['rating', 'descending']])
        .populate('foods');
    if (resulte.length > 0) {
        return res.status(200).json(resulte);
    }
    return res.status(400).json({ message: "Data Not Found" });
});
exports.getFoodAvailability = getFoodAvailability;
const getTopRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const resulte = yield vindor_model_1.VindorModel.find({ pincode: pincode, serviceAvailable: true })
        .sort([['rating', 'descending']])
        .limit(5);
    if (resulte.length > 0) {
        return res.status(200).json(resulte);
    }
    return res.status(400).json({ message: "Data Not Found" });
});
exports.getTopRestaurant = getTopRestaurant;
const getFoodIn30Min = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const resulte = yield vindor_model_1.VindorModel.find({ pincode: pincode, serviceAvailable: true })
        .populate('foods');
    if (resulte.length > 0) {
        const foodResult = [];
        resulte.forEach((vindor) => {
            const foods = vindor.foods;
            foodResult.push(...foods.filter((food) => food.readyTime <= 30));
        });
        return res.status(200).json(foodResult);
    }
    return res.status(400).json({ message: "Data Not Found" });
});
exports.getFoodIn30Min = getFoodIn30Min;
const searchFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.searchFood = searchFood;
const getRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield vindor_model_1.VindorModel.findById(req.params.id);
    if (!restaurant) {
        return res.status(404).json({ message: "there are no restaurant with this id" });
    }
    return res.status(200).json({ data: restaurant });
});
exports.getRestaurant = getRestaurant;
