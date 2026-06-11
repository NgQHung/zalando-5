import express from 'express';
import { getAllProducts, getProductsDetail } from '../controllers/productsController';
import authRouter from './auth';
import userRouter from './user';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/product/:id', getProductsDetail);

router.use('/v1/auth', authRouter);
router.use('/v1/user', userRouter);

export default router;
