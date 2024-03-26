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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onRequestOtp = exports.GenerateOtp = void 0;
const twilio_1 = __importDefault(require("twilio"));
const GenerateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expire = new Date();
    expire.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { expire, otp };
};
exports.GenerateOtp = GenerateOtp;
const onRequestOtp = (otp, toPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const accountId = process.env.TWILIO_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    // const verifySid =process.env.TWILIO_VERIFY_SID as string
    const client = (0, twilio_1.default)(accountId, token);
    console.log(toPhoneNumber);
    const respons = yield client.messages.create({
        body: `your otp is ${otp}`,
        from: "+17868297796",
        to: toPhoneNumber
    });
    return respons;
});
exports.onRequestOtp = onRequestOtp;
