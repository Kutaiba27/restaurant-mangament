"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessToken = exports.createRefreshToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createRefreshToken = (name, id) => {
    return (0, jsonwebtoken_1.sign)({ name, id }, process.env.REFRESH_TOKEN || "this is refresh token");
};
exports.createRefreshToken = createRefreshToken;
const createAccessToken = (name, id) => {
    return (0, jsonwebtoken_1.sign)({ userInfo: { name, id } }, process.env.ACCESS_TOKEN || "this is access token", { expiresIn: "10s" });
};
exports.createAccessToken = createAccessToken;
