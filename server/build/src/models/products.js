"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ProductSchema = new Schema({
    brandName: { type: String },
    colour: { type: String },
    id: { type: Number },
    imageUrl: { type: String },
    isSellingFast: { type: Boolean },
    name: { type: String },
    price: {
        type: {
            currency: String,
            current: {
                value: Number,
                text: String,
            },
            previous: {
                value: Number || null,
                text: String,
            },
            isMarkedDown: Boolean,
            isOutletPrice: Boolean,
        },
    },
    productCode: { type: Number },
    productType: { type: String },
});
const ProductModel = mongoose_1.default.model('products', ProductSchema);
exports.default = ProductModel;
