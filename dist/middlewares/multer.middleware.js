"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultiblImage = exports.uploadSinglImage = void 0;
const multer_1 = __importDefault(require("multer"));
const initMulter = () => {
    const multerFilter = (req, file, cb) => {
        if (file.mimetype.split('/')[0] == 'image') {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    };
    const storage = multer_1.default.memoryStorage();
    const upload = (0, multer_1.default)({ storage: storage, fileFilter: multerFilter });
    return upload;
};
const uploadSinglImage = (fileName) => initMulter().single(fileName);
exports.uploadSinglImage = uploadSinglImage;
const uploadMultiblImage = (feilds) => initMulter().fields(feilds);
exports.uploadMultiblImage = uploadMultiblImage;
