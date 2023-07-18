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
exports.getProductsDetail = exports.getAllProducts = void 0;
const products_1 = __importDefault(require("../models/products"));
const productDetail_1 = __importDefault(require("../models/productDetail"));
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let products;
    try {
        products = yield products_1.default.find({});
        return res.json(products);
    }
    catch (error) {
        const err = error;
        return res.status(500).json({
            data: null,
            message: 'Oops!!! Something went wrong.',
            error: err.message,
        });
    }
});
exports.getAllProducts = getAllProducts;
const getProductsDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idToNumber = Number(id);
    let product;
    try {
        const existingProduct = yield productDetail_1.default.findOne({ id: idToNumber });
        product = existingProduct;
        return res.status(200).json(product);
    }
    catch (error) {
        const err = error;
        return res.status(500).json({
            data: null,
            message: 'Oops!!! Something went wrong.',
            error: err.message,
        });
    }
});
exports.getProductsDetail = getProductsDetail;
