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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const resfreshTokens_1 = require("../store/resfreshTokens");
const tokenController = {
    // create access token
    createAccessToken: (id, admin) => {
        return jsonwebtoken_1.default.sign({ id, admin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    },
    // create refresh token
    createRefreshToken: (id, admin) => {
        return jsonwebtoken_1.default.sign({ id, admin }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '3d' });
    },
    // refresh token
    requireRefreshToken: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // get refresh token from user
        const refreshToken = req.cookies.refreshToken;
        try {
            if (!refreshToken)
                return res.status(401).json({ data: null, msg: 'You are not authenticated' });
            if (!resfreshTokens_1.GlobalArr.refreshTokens.includes(refreshToken))
                return res.status(403).json({ data: null, msg: 'Refresh token is invalid' });
            jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(401).json(err);
                }
                resfreshTokens_1.GlobalArr.refreshTokens = resfreshTokens_1.GlobalArr.refreshTokens.filter((token) => token !== refreshToken);
                const newRefreshToken = tokenController.createRefreshToken(user.id, user.admin);
                const newAccessToken = tokenController.createAccessToken(user.id, user.admin);
                resfreshTokens_1.GlobalArr.refreshTokens.push(newRefreshToken);
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                });
                return res.status(200).json({ accessToken: newAccessToken });
            });
        }
        catch (error) {
            const err = error;
            return res.status(500).json({
                data: null,
                message: 'Oops!!! Something went wrong.',
                error: err.message,
            });
        }
    }),
};
exports.default = tokenController;
