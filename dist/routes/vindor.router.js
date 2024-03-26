"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VindorRouter = void 0;
const express_1 = require("express");
const vindor_controller_1 = require("../controllers/vindor.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const resize_middleware_1 = require("../middlewares/resize.middleware");
const router = (0, express_1.Router)();
exports.VindorRouter = router;
router.post('/login', vindor_controller_1.LoginVindor)
    .get('/profile', auth_middleware_1.Authorization, vindor_controller_1.GetVindorProfile)
    .patch('/profile', auth_middleware_1.Authorization, vindor_controller_1.UpdateVindorProfile)
    .patch('/service', auth_middleware_1.Authorization, vindor_controller_1.UpdateVindorServes);
router.post('/add-food', auth_middleware_1.Authorization, vindor_controller_1.uploudImageMultibl, (0, resize_middleware_1.reSizeOndStor)('food'), vindor_controller_1.addFood)
    .get('/food/:id', vindor_controller_1.getFood)
    .get('/foods/', vindor_controller_1.getFoods);
router.get('offers')
    .post('/offer')
    .get('/offer/:id')
    .delete('/offer/:id');
router.get('/order', vindor_controller_1.getCurrentOrders)
    .put('/order/:id/process', vindor_controller_1.processOrder)
    .get('/order/:id', vindor_controller_1.getOrderDetail);
