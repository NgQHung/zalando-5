"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userLikedProductSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    data: [
        {
            type: {
                id: { type: Number },
            },
        },
    ],
});
const LikedProductModel = mongoose_1.default.model('userLikedProduct', userLikedProductSchema);
exports.default = LikedProductModel;
