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
exports.reSizeOndStor = void 0;
const sharp_1 = __importDefault(require("sharp"));
const uuid_1 = require("uuid");
const reSizeOndStor = (folderName) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // req.body.images= []
    if (req.files && 'mainImage' in req.files) {
        const fileName = `${folderName}-${uuid_1.v4}-${Date.now()}.jpeg`;
        yield (0, sharp_1.default)(req.files.mainImage[0].buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`src/uploads/${folderName}/${fileName}`)
            .then((info) => {
            console.log("for win imagggggggggggggggggggggggggggggggggggggggggggggggggggggggg", info);
            req.body.images.push(fileName);
        })
            .catch(err => console.error(err));
    }
    if (req.files && 'images' in req.files) {
        const fileName = `${folderName}-${uuid_1.v4}-${Date.now()}.jpeg`;
        yield Promise.all(req.files.images.map((image) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, sharp_1.default)(image.buffer)
                .resize(600, 600)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`src/uploads/${folderName}/${fileName}`)
                .then((info) => {
                console.log("for win imagggggggggggggggggggggggggggggggggggggggggggggggggggggggg", info);
                req.body.images.push(fileName);
            });
        })));
    }
    next();
});
exports.reSizeOndStor = reSizeOndStor;
