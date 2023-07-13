import { Request, Response, NextFunction } from 'express';
export declare const getAllProducts: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export declare const getProductsDetail: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
