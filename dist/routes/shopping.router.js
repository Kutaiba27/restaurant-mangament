"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingRouter = void 0;
const express_1 = require("express");
const shopping_controller_1 = require("../controllers/shopping.controller");
const router = (0, express_1.Router)();
exports.ShoppingRouter = router;
// FoodModel Availablilty
router.get('/:pincode', shopping_controller_1.getFoodAvailability)
    .get('/top-restaurants/:pincode', shopping_controller_1.getTopRestaurant)
    .get('/food-in-30-min/:pincode', shopping_controller_1.getFoodIn30Min)
    .get('/search/:pincode', shopping_controller_1.searchFood)
    .get('/restaurant/:id', shopping_controller_1.getRestaurant);
