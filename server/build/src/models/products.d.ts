import mongoose from 'mongoose';
import { Products } from '../interfaces/products';
declare const ProductModel: mongoose.Model<Products, {}, {}, {}, any>;
export default ProductModel;
