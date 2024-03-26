"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${this.statusCode}`.startsWith('4') ? "fail" : "error";
    }
}
exports.ApiError = ApiError;
