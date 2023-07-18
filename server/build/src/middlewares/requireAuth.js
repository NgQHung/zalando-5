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
const middleware = {
    // verify token
    verifyToken: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json('Authentication required. You are not authenticated!!!');
        }
        const token = authorization.split(' ')[1];
        try {
            jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json('Token is invalid');
                }
                req.user = user;
                next();
            });
        }
        catch (error) {
            console.log(error);
            return res.status(401).json('Request is not authorized');
        }
    }),
    verifyTokenAndAdmin: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            middleware.verifyToken(req, res, () => {
                var _a;
                if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) == req.params.id || req.params.admin) {
                    next();
                }
                else {
                    return res.status(403).json('You are not allowed to delete it');
                }
            });
        }
        catch (error) {
            return res.status(401).json('Request is not authorized');
        }
    }),
};
exports.default = middleware;
