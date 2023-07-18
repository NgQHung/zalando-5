import mongoose from 'mongoose';
import IShoppingCart from '../interfaces/shoppingCart';
export interface IShoppingCartModel extends IShoppingCart, mongoose.Document {
    _id: any;
    id: any;
    _doc?: any;
}
declare const ProductShoppingCartModel: mongoose.Model<IShoppingCartModel, {}, {}, {}, any>;
export default ProductShoppingCartModel;
