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
exports.webHook = exports.createPaymet = exports.editCusomerProfile = exports.getCustomerProfile = exports.requestOpt = exports.customerVerify = exports.customerLogIn = exports.customerSingIn = void 0;
const class_transformer_1 = require("class-transformer");
const customer_dto_1 = require("../dto/customer.dto");
const class_validator_1 = require("class-validator");
const customer_model_1 = require("../model/customer.model");
const notification_1 = require("../utility/notification");
const PasswordUtility_1 = require("../utility/PasswordUtility");
const order_model_1 = require("../model/order.model");
const JWTUtility_1 = require("../utility/JWTUtility");
const stripe_1 = __importDefault(require("stripe"));
const customerSingIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerInput = (0, class_transformer_1.plainToInstance)(customer_dto_1.CreateCustomerDto, req.body);
        const inputError = yield (0, class_validator_1.validate)(customerInput, { validationError: { target: true } });
        if (inputError.length > 0) {
            return res.status(400).json({ message: inputError });
        }
        const customerExisting = yield customer_model_1.CustomerModel.findOne({ email: customerInput.email });
        if (customerExisting)
            return res.status(400).json({ message: " the user regestier with previes email" });
        const { otp, expire } = (0, notification_1.GenerateOtp)();
        customerInput.otp = otp;
        customerInput.otp_expire = expire;
        customerInput.salt = yield (0, PasswordUtility_1.GenerateSult)();
        customerInput.password = yield (0, PasswordUtility_1.GeneratePassword)(customerInput.password, customerInput.salt);
        const customer = yield customer_model_1.CustomerModel.create(customerInput);
        const otprespons = yield (0, notification_1.onRequestOtp)(customerInput.otp, customerInput.phone);
        console.log(otprespons);
        const token = (0, JWTUtility_1.GeneratSignature)({
            _id: customer._id.toString(),
            firstName: customer.firstName,
            email: customer.email,
            verified: customer.verified
        });
        res.status(201).json({ status: "success", data: customer, token });
    }
    catch (error) {
        next(error);
    }
});
exports.customerSingIn = customerSingIn;
const customerLogIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerInput = (0, class_transformer_1.plainToInstance)(customer_dto_1.LoginCustomer, req.body);
        const customer = yield customer_model_1.CustomerModel.findOne({ email: customerInput.email });
        if (!customer)
            return res.status(404).json({ message: "the customer not found" });
        const valitdatePasswrod = (0, PasswordUtility_1.VirfyPassword)(customerInput.password, customer.password);
        if (!valitdatePasswrod)
            return res.status(400).json({ message: "email or password is not currect" });
        const token = (0, JWTUtility_1.GeneratSignature)({
            email: customer.email,
            _id: customer._id,
            verified: customer.verified,
            firstName: customer.firstName
        });
        res.cookie("token", token);
        return res.status(200).json({ message: "login successfully", token });
    }
    catch (e) {
        res.status(400).json({ message: "there are something wrong" });
    }
});
exports.customerLogIn = customerLogIn;
const customerVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const profile = yield customer_model_1.CustomerModel.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        if ((profile === null || profile === void 0 ? void 0 : profile.otp) == parseInt(req.body.otp) && profile.otp_expire >= new Date()) {
            profile.verified = true;
            yield profile.save();
            const signeture = (0, JWTUtility_1.GeneratSignature)({
                _id: profile._id,
                verified: true,
                firstName: profile.firstName,
                email: profile.email
            });
            res.cookie("token", signeture);
            return res.status(200).json({ message: "veryfied successfuly", data: { signeture } });
        }
        return res.status(400).json({ message: "the otp not valid or expierd" });
    }
    catch (error) {
        next(error);
    }
});
exports.customerVerify = customerVerify;
const requestOpt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield customer_model_1.CustomerModel.findById(customer._id);
        if (profile) {
            const { otp, expire } = (0, notification_1.GenerateOtp)();
            profile.otp = otp;
            profile.otp_expire = expire;
            yield profile.save();
            const sendCode = yield (0, notification_1.onRequestOtp)(otp, profile.phone);
            if (!sendCode) {
                return res.status(400).json({ message: 'Failed to verify your phone number' });
            }
            return res.status(200).json({ message: 'OTP sent to your registered Mobile Number!' });
        }
    }
    return res.status(400).json({ msg: 'Error with Requesting OTP' });
});
exports.requestOpt = requestOpt;
const getCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const customerInfo = yield customer_model_1.CustomerModel.findOne({ _id: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id });
        if (!customerInfo)
            return res.status(404).json({ message: "cusomer not found" });
        return res.status(200).json({ data: customerInfo });
    }
    catch (e) {
        return res.status(400).json({ message: e });
    }
});
exports.getCustomerProfile = getCustomerProfile;
const editCusomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const editInfo = (0, class_transformer_1.plainToInstance)(customer_dto_1.EditCustomerDto, req.body);
        const validattion = yield (0, class_validator_1.validate)(editInfo, { validationError: { target: true } });
        if (validattion.length >= 0)
            return res.status(400).json({ message: validattion.values() });
        const updateCustomer = yield customer_model_1.CustomerModel.findOneAndUpdate({ _id: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id }, { editInfo }, { new: true });
        return res.status(201).json({ message: "updated successfully", data: updateCustomer });
    }
    catch (e) {
        return res.status(500).json({ message: e });
    }
});
exports.editCusomerProfile = editCusomerProfile;
const createPaymet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const order = yield order_model_1.OrderModel.findById(req.params.orderId).populate('cart');
    const applicationFeePercentage = 5;
    const applicationFeeAmount = Math.round((order === null || order === void 0 ? void 0 : order.totalPrice) * (applicationFeePercentage / 100));
    const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
    const session = yield stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: "your order ",
                        description: "this is description discribed you order",
                    },
                    unit_amount: (order === null || order === void 0 ? void 0 : order.totalPrice) * 100,
                },
                quantity: 1,
            },
        ],
        payment_method_types: ['card'],
        payment_intent_data: {
            application_fee_amount: applicationFeeAmount,
            capture_method: "automatic",
            transfer_data: {
                destination: "acct_1OwMFkJUGxgf6yPZ",
                amount: (order === null || order === void 0 ? void 0 : order.totalPrice) - applicationFeeAmount
            }
        },
        mode: 'payment',
        customer_email: (_d = req.user) === null || _d === void 0 ? void 0 : _d.email,
        client_reference_id: order === null || order === void 0 ? void 0 : order._id,
        success_url: `${req.protocol}://${req.get('host')}/order/orders`,
        cancel_url: `${req.protocol}://${req.get('host')}/order/order/${req.params.orderId}`,
    });
    res.status(200).json({ data: session });
});
exports.createPaymet = createPaymet;
const webHook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, "webhokekey");
        console.log(event);
    }
    catch (err) {
        res.status(400).send(`Webhook Error: ${err}`);
        return;
    }
});
exports.webHook = webHook;
