import express from 'express';
import env from 'dotenv';
import bodyParser from 'body-parser';
import router from './src/routes';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import serveStatic from 'serve-static';
import path from 'path';
import multer from 'multer';
import cacheControl from 'express-cache-controller';

env.config({ path: path.resolve(__dirname, './.env') });

const app = express();
const upload = multer();

const PORT = process.env.PORT || 8080;

const allowedOrigins = ['https://zalando-5.vercel.app', 'http://localhost:3000'];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use(cacheControl());

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(upload.array('data'));

app.use(serveStatic('public/ftp', { index: ['default.html', 'default.htm'] }));
app.use('/dist', express.static(path.resolve(__dirname, '../client/dist')));

app.use(router);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    app.listen(PORT, () => console.log('listening on port ', PORT));
  })
  .catch((error) => {
    console.log(error);
  });
