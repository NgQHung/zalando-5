"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userAddressDelivery = new Schema({
    _id: { type: Schema.Types.ObjectId },
    firstName: { type: Schema.Types.Mixed, required: true },
    lastName: { type: Schema.Types.Mixed, required: true },
    address: { type: Schema.Types.Mixed, required: true },
    info: { type: Schema.Types.Mixed },
    psc: { type: Schema.Types.Mixed, required: true },
    city: { type: Schema.Types.Mixed, required: true },
});
const AddressDeliveryModel = mongoose_1.default.model('userAddressDelivery', userAddressDelivery);
exports.default = AddressDeliveryModel;
