"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userShoppingCart_1 = __importDefault(require("../models/userShoppingCart"));
const userAddressDelivery_1 = __importDefault(require("../models/userAddressDelivery"));
const userLikedProduct_1 = __importDefault(require("../models/userLikedProduct"));
const user_1 = __importDefault(require("../models/user"));
const userPurchasedProducts_1 = __importDefault(require("../models/userPurchasedProducts"));
const userController = {
    // get all users
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allUsers = yield user_1.default.find();
            return res.status(200).json({ data: allUsers });
        }
        catch (error) {
            const err = error;
            return res.status(500).json({
                data: null,
                message: 'Oops!!! Something went wrong.',
                error: err.message,
            });
        }
    }),
    // delete an user
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.body;
        try {
            const user = yield user_1.default.findById(id);
            return res.status(200).json('User is deleted successfully');
        }
        catch (error) {
            const err = error;
            return res.status(500).json({
                data: null,
                message: 'Oops!!! Something went wrong.',
                error: err.message,
            });
        }
    }),
    addAddressDeliveryUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { data } = req.body;
        try {
            const existingId = yield userAddressDelivery_1.default.findOne({ _id: id });
            let info;
            if (existingId) {
                info = yield userAddressDelivery_1.default.updateOne({
                    _id: id,
                }, { $set: { data: data } });
            }
            else {
                info = yield userAddressDelivery_1.default.create({
                    _id: id,
                    data: data,
                });
            }
            // return res.status(200).json(req.body);
            return res.status(200).json(existingId);
        }
        catch (error) {
            const err = error;
            return res.status(500).json({
                data: null,
                message: 'Oops!!! Something went wrong.',
                error: err.message,
            });
        }
    }),
    addProductToShoppingCart: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { data } = req.body;
        try {
            const existingId = yield userShoppingCart_1.default.findOne({ _id: id });
            let product;
            if (existingId) {
                product = yield userShoppingCart_1.default.updateOne({
                    _id: id,
                }, 
                // for push object data to an array
                // {
                //   $push: { data: data },
                // }
                { data: data });
            }
            else {
                product = yield userShoppingCart_1.default.create({
                    _id: id,
                    data: data,
                });
            }
            return res.status(200).json(data);
        }
        catch (error) {
            const err = error;
            return res.status(500).json({
                data: null,
                message: 'Oops!!! Something went wrong.',
                error: err.message,
            });
        }
    }),
    addProductToLiked: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { data } = req.body;
        try {
            const existingId = yield userLikedProduct_1.default.findOne({ _id: id });
            let product;
            if (existingId) {
                product = yield userLikedProduct_1.default.updateOne({
                    _id: id,
                }, { data: data });
            }
            else {
                product = yield userLikedProduct_1.default.create({
                    _id: id,
                    data: data,
                });
            }
            return res.status(200).json(product);
        }
        catch (error) {
            const err = error;
            return res.status(500).json({
                data: null,
                message: 'Oops!!! Something went wrong.',
                error: err.message,
            });
        }
    }),
    getAddressDeliveryById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        // let newObj = {}
        try {
            const all = yield userAddressDelivery_1.default.findOne({ _id: id });
            // if(AddressDelivery?._id )
            if (!all) {
                return res.status(200).json({
                    _id: id,
                    data: {},
                });
            }
            else
                return res.status(200).json(all);
            // return res.status(200).json(all);
        }
        catch (error) {
            const err = error;
            return res.status(500).json({
                data: null,
                message: 'Oops!!! Something went wrong.',
                error: err.message,
            });
        }
    }),
    getProductsFromShoppingCartById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const all = yield userShoppingCart_1.default.findOne({ _id: id });
            if (all) {
                return res.status(200).json(all);
            }
            else {
                return res.status(200).json({ _id: id, data: [] });
            }
        }
        catch (error) {
            const err = error;
            return res.status(500).json({
                _id: id,
                data: null,
                message: 'Oops!!! Something went wrong.',
                error: err.message,
            });
        }
    }),
    getProductsFromLiked: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const all = yield userLikedProduct_1.default.findOne({ _id: id });
            if (all) {
                return res.status(200).json(all);
            }
            else {
                return res.status(200).json({ _id: id, data: [] });
            }
        }
        catch (error) {
            const err = error;
            return res.status(500).json({
                data: null,
                message: 'Oops!!! Something went wrong.',
                error: err.message,
            });
        }
    }),
    postPurchasedProductsById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const data = req.body;
        try {
            const existingId = yield userPurchasedProducts_1.default.findOne({ _id: id });
            let product;
            if (existingId) {
                product = yield userPurchasedProducts_1.default.findOneAndUpdate({
                    _id: id,
                }, 
                // for push object data to an array
                {
                    $push: {
                        data: data,
                    },
                }
                // { data: data }
                );
            }
            else {
                product = yield userPurchasedProducts_1.default.create({
                    _id: id,
                    data,
                });
            }
            // return res.status(200).json(req.body);
            return res.status(200).json({
                _id: id,
                data: product,
                message: `Info address delivery of user is updated successfully`,
            });
        }
        catch (error) {
            const err = error;
            return res.status(500).json({
                data: null,
                message: 'Oops!!! Something went wrong.',
                error: err.message,
            });
        }
        // return res.status(200).json(data);
    }),
    getPurchasedProductsById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const all = yield userPurchasedProducts_1.default.findOne({ _id: id });
            if (!all) {
                return res.status(200).json({
                    _id: id,
                    data: [],
                });
            }
            else
                return res.status(200).json(all);
        }
        catch (error) {
            const err = error;
            return res.status(500).json({
                data: null,
                message: 'Oops!!! Something went wrong.',
                error: err.message,
            });
        }
    }),
};
exports.default = userController;
