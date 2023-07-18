"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true, minlength: 10, maxlength: 50 },
    password: { type: String, require: true, unique: true, minlength: 6 },
    admin: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('users', userSchema);
