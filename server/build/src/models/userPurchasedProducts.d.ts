import mongoose from 'mongoose';
import IPurchasedProducts from '../interfaces/purchasedProducts';
export interface IPurchasedProductsModel extends IPurchasedProducts, mongoose.Document {
    _id: any;
    id: any;
    _doc?: any;
}
declare const PurchasedProductModel: mongoose.Model<IPurchasedProducts, {}, {}, {}, any>;
export default PurchasedProductModel;
