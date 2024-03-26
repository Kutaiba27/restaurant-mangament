"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratSignature = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const GeneratSignature = (payload) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, { expiresIn: "1d" }).toString();
};
exports.GeneratSignature = GeneratSignature;
