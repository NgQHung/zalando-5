import mongoose from 'mongoose';
import IUser from '../interfaces/user';
export interface IUserModel extends IUser, mongoose.Document {
    _id: any;
    _doc?: any;
}
declare const _default: mongoose.Model<IUserModel, {}, {}, {}, any>;
export default _default;
