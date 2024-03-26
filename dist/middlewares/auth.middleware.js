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
exports.Authorization = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const Authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const signature = (_a = req.get('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!signature) {
        return res.status(401).json({ message: "token is note defind" });
    }
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const payload = (0, jsonwebtoken_1.verify)(signature, process.env.JWT_SECRET);
        if (payload) {
            req.user = payload;
            next();
        }
    }
    catch (error) {
        return res.status(401).json({ message: "you are not authenticated" });
    }
});
exports.Authorization = Authorization;
