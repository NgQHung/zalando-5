"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../../controllers/userController"));
// import userProductController from "../../controllers/";
const requireAuth_1 = __importDefault(require("../../middlewares/requireAuth"));
const userRouter = express_1.default.Router();
// get all users
userRouter.get('/all', requireAuth_1.default.verifyToken, userController_1.default.getAllUsers);
// delete a user by ID
userRouter.delete('/:id', requireAuth_1.default.verifyTokenAndAdmin, userController_1.default.deleteUser);
// post data of user
userRouter.post('/:id/shopping-cart', requireAuth_1.default.verifyToken, userController_1.default.addProductToShoppingCart);
userRouter.post('/:id/liked', requireAuth_1.default.verifyToken, userController_1.default.addProductToLiked);
// post data address delivery user
userRouter.post('/:id/address-delivery', requireAuth_1.default.verifyToken, userController_1.default.addAddressDeliveryUser);
// get data address delivery user
userRouter.get('/:id/address-delivery/info', requireAuth_1.default.verifyToken, userController_1.default.getAddressDeliveryById);
// post data purchased products && method payment user
userRouter.post('/:id/purchased-products/post', requireAuth_1.default.verifyToken, userController_1.default.postPurchasedProductsById);
// post data added products user
// userRouter.post('/:id/added-products/post', middleware.verifyToken, userProductController.addedProduct);
// get data purchased products && method payment user
userRouter.get('/:id/purchased-products', requireAuth_1.default.verifyToken, userController_1.default.getPurchasedProductsById);
// get data of user
userRouter.get('/:id/shopping-cart/products', requireAuth_1.default.verifyToken, userController_1.default.getProductsFromShoppingCartById);
userRouter.get('/:id/liked/products', requireAuth_1.default.verifyToken, userController_1.default.getProductsFromLiked);
exports.default = userRouter;
