import { Request, Response } from 'express';
declare const authController: {
    register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    logout: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default authController;
