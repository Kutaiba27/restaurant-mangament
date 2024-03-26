"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
const sendErrorForDev = (error, req, res) => res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    error: error,
    stack: error.stack
});
const sendErrorForProd = (error, req, res) => res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
});
const globalError = (error, req, res) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    if (process.env.ENV === "development") {
        return sendErrorForDev(error, req, res);
    }
    return sendErrorForProd(error, req, res);
};
exports.globalError = globalError;
