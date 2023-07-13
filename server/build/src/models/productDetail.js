"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ProductDetailSchema = new Schema({
    id: { type: Number },
    name: { type: String },
    descript: { type: String },
    gender: { type: String },
    productCode: { type: String },
    pdpLayout: { type: String },
    brand: {
        type: {
            brandId: Number,
            name: String,
            description: String,
        },
    },
    variants: {
        type: [
            {
                id: Number,
                name: String,
                sizeId: Number,
                brandSize: String,
                isInStock: Boolean,
                isAvailable: Boolean,
                colour: String,
                colourWayId: String,
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
            },
        ],
    },
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
    media: {
        type: {
            images: [
                {
                    url: String,
                    colour: String,
                    colourWayId: Number,
                },
            ],
        },
    },
    info: {
        type: {
            aboutMe: String,
            careInfo: String,
        },
    },
    productType: {
        type: {
            id: Number,
            name: String,
        },
    },
    // brandName: { type: String },
    // colour: { type: String },
    // imageUrl: { type: String },
    // isSellingFast: { type: Boolean },
    // // productCode: { type: Number },
    // productType: { type: String },
});
const ProductDetailModel = mongoose_1.default.model('product-detail', ProductDetailSchema);
exports.default = ProductDetailModel;
