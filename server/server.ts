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

env.config({ path: path.resolve(__dirname, './.env') });

const app = express();
// serve static
app.use(serveStatic('public/ftp', { index: ['default.html', 'default.htm'] }));
app.use('/dist', express.static(path.resolve(__dirname, '../client/dist')));
// router.get('/', (req, res: Response) => {
//   res.download(path.resolve(__dirname, '../client/public/index.html'));
// });
app.use('/', express.static(path.join(__dirname, '../client/public/index.html')));

const corsOptions = {
  credentials: true,
  origin: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(helmet());

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
// app.use(bodyParser.json({}));
/** Parse the body - middleware */
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
    app.listen(PORT, () => console.log('listening on port ', PORT));
  })
  .catch((error) => {
    console.log(error);
  });
