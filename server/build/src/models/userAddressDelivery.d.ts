import mongoose from 'mongoose';
import IAddressDelivery from '../interfaces/addressDelivery';
export interface IAddressDeliveryModel extends IAddressDelivery, mongoose.Document {
    _id: any;
    id: any;
    _doc?: any;
}
declare const AddressDeliveryModel: mongoose.Model<IAddressDeliveryModel, {}, {}, {}, any>;
export default AddressDeliveryModel;
