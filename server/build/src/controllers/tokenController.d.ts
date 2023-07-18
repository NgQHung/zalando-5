import express, { Response, Request, NextFunction } from 'express';
declare const tokenController: {
    createAccessToken: (id: string, admin: boolean) => string;
    createRefreshToken: (id: string, admin: boolean) => string;
    requireRefreshToken: (req: Request, res: Response, next: NextFunction) => Promise<express.Response<any, Record<string, any>> | undefined>;
};
export default tokenController;
