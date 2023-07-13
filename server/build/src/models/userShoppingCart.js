"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userShoppingCart = new Schema({
    // id: { type: String },
    data: {
        type: [
            {
                id: { type: Number },
                brand: { type: String },
                name: { type: String },
                imageUrl: { type: String },
                currentPrice: { type: Number },
                previousPrice: { type: Number },
                isFavorite: { type: Boolean },
                amount: { type: Number },
                size: { type: String },
                totalProduct: { type: Number },
            },
        ],
    },
});
const ProductShoppingCartModel = mongoose_1.default.model('userShoppingCart', userShoppingCart);
exports.default = ProductShoppingCartModel;
