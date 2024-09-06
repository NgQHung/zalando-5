import express, { NextFunction, Response }  from 'express';
import userController from '../../controllers/userController';
// import userProductController from "../../controllers/";
import middleware from '../../middlewares/requireAuth';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';
const userRouter = express.Router();

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
userRouter.get('/all', middleware.verifyToken, userController.getAllUsers);

// delete a user by ID
userRouter.delete('/:id', middleware.verifyTokenAndAdmin, userController.deleteUser);

// post data of user
userRouter.post('/:id/shopping-cart', middleware.verifyToken, userController.addProductToShoppingCart);
userRouter.post('/:id/liked', middleware.verifyToken, userController.addProductToLiked);

// post data address delivery user
userRouter.post('/:id/address-delivery', middleware.verifyToken, userController.addAddressDeliveryUser);

// get data address delivery user
userRouter.get('/:id/address-delivery/info', middleware.verifyToken, userController.getAddressDeliveryById);

// post data purchased products && method payment user
userRouter.post('/:id/purchased-products/post', middleware.verifyToken, userController.postPurchasedProductsById);

// post data added products user
// userRouter.post('/:id/added-products/post',  userProductController.addedProduct);

// get data purchased products && method payment user
userRouter.get('/:id/purchased-products', middleware.verifyToken, userController.getPurchasedProductsById);

// get data of user
userRouter.get('/:id/shopping-cart/products', middleware.verifyToken, userController.getProductsFromShoppingCartById);
userRouter.get('/:id/liked/products', middleware.verifyToken, userController.getProductsFromLiked);

export default userRouter;
