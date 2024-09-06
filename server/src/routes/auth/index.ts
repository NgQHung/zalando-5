import express, {Response, NextFunction} from 'express';
import authController from '../../controllers/authControllers';
import tokenController from '../../controllers/tokenController';
import middleware from '../../middlewares/requireAuth';

const authRouter = express.Router();


authRouter.use(function (_req, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URI);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, X-Requested-With, Authorization'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', middleware.verifyToken, authController.logout);

authRouter.post('/refresh', tokenController.requireRefreshToken);

export default authRouter;
