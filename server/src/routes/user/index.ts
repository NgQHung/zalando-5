import express from 'express';
import userController from '../../controllers/userController';
// import userProductController from "../../controllers/";
import middleware from '../../middlewares/requireAuth';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';
const userRouter = express.Router();

// get all users
userRouter.get(
  '/all',
  createProxyMiddleware({
    target: 'https://zalando-5-be.vercel.app/v1/user/all',
    changeOrigin: true,
  }),
  userController.getAllUsers
);

// delete a user by ID
userRouter.delete('/:id', middleware.verifyTokenAndAdmin, userController.deleteUser);

// post data of user
userRouter.post('/:id/shopping-cart', userController.addProductToShoppingCart);
userRouter.post('/:id/liked', userController.addProductToLiked);

// post data address delivery user
userRouter.post('/:id/address-delivery', userController.addAddressDeliveryUser);

// get data address delivery user
userRouter.get('/:id/address-delivery/info', userController.getAddressDeliveryById);

// post data purchased products && method payment user
userRouter.post('/:id/purchased-products/post', userController.postPurchasedProductsById);

// post data added products user
// userRouter.post('/:id/added-products/post',  userProductController.addedProduct);

// get data purchased products && method payment user
userRouter.get('/:id/purchased-products', userController.getPurchasedProductsById);

// get data of user
userRouter.get(
  '/:id/shopping-cart/products',
  createProxyMiddleware({
    target: 'https://zalando-5-be.vercel.app/v1/user/:id/shopping-cart/products',
    changeOrigin: true,
  }),
  userController.getProductsFromShoppingCartById
);
userRouter.get(
  '/:id/liked/products',
  createProxyMiddleware({
    target: 'https://zalando-5-be.vercel.app/v1/user/:id/liked/products',
    changeOrigin: true,
  }),
  userController.getProductsFromLiked
);

export default userRouter;
