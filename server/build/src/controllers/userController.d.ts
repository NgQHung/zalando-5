import express, { Request, Response } from 'express';
declare const userController: {
    getAllUsers: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
    deleteUser: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
    addAddressDeliveryUser: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
    addProductToShoppingCart: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
    addProductToLiked: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
    getAddressDeliveryById: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
    getProductsFromShoppingCartById: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
    getProductsFromLiked: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
    postPurchasedProductsById: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
    getPurchasedProductsById: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
};
export default userController;
