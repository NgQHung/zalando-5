import express, { Request, Response, NextFunction } from 'express';
declare const middleware: {
    verifyToken: (req: Request | any, res: Response, next: NextFunction) => Promise<express.Response<any, Record<string, any>> | undefined>;
    verifyTokenAndAdmin: (req: Request, res: Response, next: NextFunction) => Promise<express.Response<any, Record<string, any>> | undefined>;
};
export default middleware;
