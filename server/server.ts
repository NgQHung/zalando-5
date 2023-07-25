import express, { NextFunction, Response } from 'express';
import env from 'dotenv';
import bodyParser from 'body-parser';
import router from './src/routes';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import serveStatic from 'serve-static';
import path from 'path';
import multer from 'multer';
import helmet from 'helmet';
import noCache from 'nocache';
import requestIp from 'request-ip';
import { errorMiddleware } from './src/middlewares/errorMiddlewares';
var cors = require('cors');
var upload = multer();

// Listen on a specific port via the PORT environment variable
const PORT = process.env.PORT || 8080;

env.config({ path: path.resolve(__dirname, './.env') });

const app = express();

// serve static
app.use(serveStatic('public/ftp', { index: ['default.html', 'default.htm'] }));
app.use('/dist', express.static(path.resolve(__dirname, '../client/dist')));
app.use('/', express.static(path.join(__dirname, '../client/public/index.html')));

const corsOptions = {
  credentials: true,
  origin: ['https://zalando-clone-five.vercel.app', 'http://localhost:3000'],
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(function (_req, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URI);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, X-Requested-With, Authorization'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// function initializeSecurity() {
//   app.use(noCache());
//   app.use(helmet.frameguard());
//   app.use(helmet.hidePoweredBy());
//   app.use(helmet.hsts());
//   app.use(helmet.ieNoOpen());
//   app.use(helmet.noSniff());
//   app.use(helmet.xssFilter());
//   app.use(requestIp.mw());

//   // morganMiddleware(app);
// }

// function initializeErrorHandler() {
//   app.use(errorMiddleware);
// }

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
/** Parse the body - middleware */
// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(upload.array('data'));

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  // res.setHeader('Cache-Control', 'max-age=1209600');
  // res.setHeader('Cache-Control', 'no-cache');
  next();
});

// initializeSecurity();
// routes
app.use(router);
// initializeErrorHandler();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log('listening on port ', PORT));
  })
  .catch((error) => {
    console.log(error);
  });
