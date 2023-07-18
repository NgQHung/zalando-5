import mongoose from 'mongoose';
import { Products } from '../interfaces/products';
declare const ProductDetailModel: mongoose.Model<Products, {}, {}, {}, any>;
export default ProductDetailModel;
