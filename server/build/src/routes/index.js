"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsController_1 = require("../controllers/productsController");
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
// import authRouter
const router = express_1.default.Router();
// products
router.get('/products', productsController_1.getAllProducts);
router.get('/product/:id', productsController_1.getProductsDetail);
// authentication
router.use('/v1/auth', auth_1.default);
// user
router.use('/v1/user', user_1.default);
exports.default = router;
