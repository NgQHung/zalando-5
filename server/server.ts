import express from 'express';
import { NextFunction, Response } from 'express';
import env from 'dotenv';
import bodyParser from 'body-parser';
import router from './src/routes';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import serveStatic from 'serve-static';
import path from 'path';
import multer from 'multer';
import cacheControl from 'express-cache-controller';

const cors = require('cors');

const PORT = process.env.PORT || 8080;

env.config({ path: path.resolve(__dirname, './.env') });

const app = express();
const upload = multer();

const corsOptions = {
  origin: ['https://zalando-5.vercel.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(cacheControl());

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(upload.array('data'));

app.use(serveStatic('public/ftp', { index: ['default.html', 'default.htm'] }));
app.use('/dist', express.static(path.resolve(__dirname, '../client/dist')));

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  next();
});

app.use(router);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    app.listen(PORT, () => console.log('listening on port ', PORT));
  })
  .catch((error) => {
    console.log(error);
  });
