"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const router = (0, express_1.Router)();
exports.AdminRouter = router;
router.post('/vindor', admin_controller_1.createVinder)
    .get('/vindors', admin_controller_1.getVinders)
    .get('/vindor/:id', admin_controller_1.getVindor);
