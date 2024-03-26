"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const order_controller_1 = require("../controllers/order.controller");
const router = (0, express_1.Router)();
exports.OrderRouter = router;
router.use(auth_middleware_1.Authorization);
router.post('/create-order/:cartId', order_controller_1.createOrder);
router.get('/orders', order_controller_1.getOrders);
router.get('/order/:id', order_controller_1.getOrderById);