import express from 'express';
import userController from '../../controllers/userController';
import middleware from '../../middlewares/requireAuth';

const userRouter = express.Router();

userRouter.get('/all', middleware.verifyToken, userController.getAllUsers);

userRouter.delete('/:id', middleware.verifyTokenAndAdmin, userController.deleteUser);

userRouter.post('/:id/shopping-cart', middleware.verifyToken, userController.addProductToShoppingCart);

userRouter.post('/:id/liked', middleware.verifyToken, userController.addProductToLiked);

userRouter.post('/:id/address-delivery', middleware.verifyToken, userController.addAddressDeliveryUser);

userRouter.get('/:id/address-delivery/info', middleware.verifyToken, userController.getAddressDeliveryById);

userRouter.post('/:id/purchased-products/post', middleware.verifyToken, userController.postPurchasedProductsById);

userRouter.get('/:id/purchased-products', middleware.verifyToken, userController.getPurchasedProductsById);

userRouter.get('/:id/shopping-cart/products', middleware.verifyToken, userController.getProductsFromShoppingCartById);

userRouter.get('/:id/liked/products', middleware.verifyToken, userController.getProductsFromLiked);

export default userRouter;
