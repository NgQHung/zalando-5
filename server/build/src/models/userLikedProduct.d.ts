import mongoose from 'mongoose';
import ILikedProducts from '../interfaces/likedProducts';
export interface ILikedProductsModel extends ILikedProducts, mongoose.Document {
    _id: any;
    id: any;
    _doc?: any;
}
declare const LikedProductModel: mongoose.Model<ILikedProductsModel, {}, {}, {}, any>;
export default LikedProductModel;
