import express, { NextFunction, Response }  from 'express';
import userController from '../../controllers/userController';
// import userProductController from "../../controllers/";
import middleware from '../../middlewares/requireAuth';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';
const userRouter = express.Router();
const url = '/v1/user'
userRouter.use(function (_req, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URI);
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  // res.header(
  //   'Access-Control-Allow-Headers',
  //   'Content-Type, Access-Control-Allow-Headers, X-Requested-With, Authorization'
  // );
  res.header('Access-Control-Allow-Headers': 'Content-Type')
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// get all users
userRouter.get(`${url}/all`, middleware.verifyToken, userController.getAllUsers);

// delete a user by ID
userRouter.delete(`${url}/:id`, middleware.verifyTokenAndAdmin, userController.deleteUser);

// post data of user
userRouter.post(`${url}/:id/shopping-cart`, middleware.verifyToken, userController.addProductToShoppingCart);
userRouter.post(`${url}/:id/liked`, middleware.verifyToken, userController.addProductToLiked);

// post data address delivery user
userRouter.post(`${url}/:id/address-delivery`, middleware.verifyToken, userController.addAddressDeliveryUser);

// get data address delivery user
userRouter.get(`${url}/:id/address-delivery/info`, middleware.verifyToken, userController.getAddressDeliveryById);

// post data purchased products && method payment user
userRouter.post(`${url}/:id/purchased-products/post`, middleware.verifyToken, userController.postPurchasedProductsById);

// post data added products user
// userRouter.post('/:id/added-products/post',  userProductController.addedProduct);

// get data purchased products && method payment user
userRouter.get(`${url}/:id/purchased-products`, middleware.verifyToken, userController.getPurchasedProductsById);

// get data of user
userRouter.get(`${url}/:id/shopping-cart/products`, middleware.verifyToken, userController.getProductsFromShoppingCartById);
userRouter.get(`${url}/:id/liked/products`, middleware.verifyToken, userController.getProductsFromLiked);

export default userRouter;
