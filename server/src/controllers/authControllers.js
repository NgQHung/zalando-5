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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const tokenController_1 = __importDefault(require("./tokenController"));
const validator_1 = __importDefault(require("validator"));
const resfreshTokens_1 = require("../store/resfreshTokens");
const authController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { password, firstName, email } = req.body;
        let errors;
        try {
            // hash the password
            if (!validator_1.default.isStrongPassword(password)) {
                errors = 'Password is not strong enough';
            }
            if (!validator_1.default.isEmail(email)) {
                errors = 'Email is not valid';
            }
            if (!email || !password) {
                errors = 'All field must not be empty';
            }
            const exist = yield user_1.default.findOne({ email });
            if (exist) {
                errors = 'Email already in use';
            }
            if (exist || errors) {
                return res.status(404).json({
                    message: errors,
                    data: null,
                });
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            // create new user
            const newUser = new user_1.default({
                firstName: firstName,
                email: email,
                password: hashedPassword,
            });
            // create an user on Mongoose
            const user = yield newUser.save();
            return res.status(200).json({ data: user, message: 'You are registered successfully' });
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
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email: req.body.email });
        try {
            if (!user) {
                return res
                    .status(404)
                    .json({ data: null, message: 'Zkontrolujte, zda jste zadali správnou e-mailovou adresu nebo heslo' });
            }
            const isPasswordMatch = user && user.password ? yield bcrypt_1.default.compare(req.body.password, user.password) : false;
            if (!isPasswordMatch) {
                return res.status(404).json({ data: null, message: 'Incorrect password!' });
            }
            if (!user || !isPasswordMatch) {
                return res.status(404).json({ data: null, message: 'All field must not be empty' });
            }
            const admin = user && user.admin ? user.admin : false;
            const accessToken = tokenController_1.default.createAccessToken(user === null || user === void 0 ? void 0 : user.id, admin);
            const refreshToken = tokenController_1.default.createRefreshToken(user === null || user === void 0 ? void 0 : user.id, admin);
            resfreshTokens_1.GlobalArr.refreshTokens.push(refreshToken);
            // create refresh token on cookies
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });
            const _a = user === null || user === void 0 ? void 0 : user._doc, { password } = _a, others = __rest(_a, ["password"]);
            return res.status(200).json(Object.assign(Object.assign({}, others), { accessToken }));
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
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.clearCookie('refreshToken');
            resfreshTokens_1.GlobalArr.refreshTokens = resfreshTokens_1.GlobalArr.refreshTokens.filter((token) => token !== req.cookies.refreshToken);
            return res.status(200).json('You are logged out successfully');
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
exports.default = authController;
