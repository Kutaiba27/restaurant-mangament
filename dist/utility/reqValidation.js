"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = exports.roomSchema = exports.hotalSchema = exports.userSchema = exports.ValidationException = void 0;
const joi_1 = __importDefault(require("joi"));
class ValidationException extends Error {
    constructor(details) {
        super("there are an error with details");
        this.details = details;
    }
}
exports.ValidationException = ValidationException;
exports.userSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.hotalSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    type: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    image: joi_1.default.array().items(joi_1.default.string()).required(),
    desciption: joi_1.default.string().required(),
});
exports.roomSchema = joi_1.default.object({
    price: joi_1.default.number().required(),
    numberOfPeople: joi_1.default.number().required(),
    roomNumber: joi_1.default.number().required(),
    avilblity: joi_1.default.boolean().required(),
    image: joi_1.default.array().items(joi_1.default.string()).required(),
    hotal: joi_1.default.number().required(),
});
function validation(JoiSchema, object) {
    const result = JoiSchema.validate(object);
    if (result.error) {
        throw new ValidationException(result.error.details);
    }
}
exports.validation = validation;
