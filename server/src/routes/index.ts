import express, { NextFunction, Response } from 'express';
import { getAllProducts, getProductsDetail } from '../controllers/productsController';
import authRouter from './auth';
import userRouter from './user';
import { createProxyMiddleware } from 'http-proxy-middleware';
// import authRouter

const router = express.Router();

// products
router.get('/products', getAllProducts);
router.get('/product/:id', getProductsDetail);

router.use(function (_req, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URI);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, X-Requested-With, Authorization'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// authentication
router.use('/v1/auth', authRouter);

// user
router.use('/v1/user', userRouter);

export default router;
