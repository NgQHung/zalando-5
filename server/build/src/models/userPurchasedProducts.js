"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PurchasedProductsSchema = new Schema({
    data: {
        type: [
            {
                listProducts: {
                    type: [
                        {
                            id: Number,
                            size: String,
                        },
                    ],
                },
                methodPayment: { type: String },
            },
        ],
    },
});
const PurchasedProductModel = mongoose_1.default.model('userPurchasedProducts', PurchasedProductsSchema);
exports.default = PurchasedProductModel;
