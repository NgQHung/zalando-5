import express, { NextFunction, Response } from 'express';
import env from 'dotenv';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import router from './src/routes';
import mongoose, { ConnectOptions, Path } from 'mongoose';
import cookieParser from 'cookie-parser';
import serveStatic from 'serve-static';
import path from 'path';
var cors = require('cors');

// Listen on a specific port via the PORT environment variable
const PORT = process.env.PORT || 8080;

const host = process.env.CLIENT_URI || '0.0.0.0';

env.config({ path: path.resolve(__dirname, './.env') });

const app = express();
// serve static
app.use(serveStatic('public/ftp', { index: ['default.html', 'default.htm'] }));
app.use('/dist', express.static(path.resolve(__dirname, '../client/dist')));
// router.get('/', (req, res: Response) => {
//   res.download(path.resolve(__dirname, '../client/public/index.html'));
// });
app.use('/', express.static(path.join(__dirname, '../client/public/index.html')));

const whitelist = [process.env.CLIENT_URI, process.env.CLIENT_URI_1];
const corsOptions = {
  credentials: true,
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(helmet());

app.use(function (_req, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URI);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.header('Access-Control-Allow-Origin', req.headers.origin);
  // res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

/** Parse the body - middleware */
app.use(express.json());
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  // res.setHeader('Cache-Control', 'max-age=1209600');
  // res.setHeader('Cache-Control', 'no-cache');
  next();
});

// routes
app.use(router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, host, () => console.log('listening on port ', PORT));
  })
  .catch((error) => {
    console.log(error);
  });
