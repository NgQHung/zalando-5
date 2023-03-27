"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
dotenv_safe_1.default.config({
    allowEmptyValues: true,
});
exports.default = {
    port: process.env.PORT,
    mongodb: {
        uri: process.env.MONGO_URI,
    },
    jwt: {
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '',
    },
};
