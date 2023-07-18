"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = __importDefault(require("../../controllers/authControllers"));
const tokenController_1 = __importDefault(require("../../controllers/tokenController"));
const requireAuth_1 = __importDefault(require("../../middlewares/requireAuth"));
const authRouter = express_1.default.Router();
authRouter.post('/register', authControllers_1.default.register);
authRouter.post('/login', authControllers_1.default.login);
authRouter.post('/logout', requireAuth_1.default.verifyToken, authControllers_1.default.logout);
authRouter.post('/refresh', tokenController_1.default.requireRefreshToken);
exports.default = authRouter;
