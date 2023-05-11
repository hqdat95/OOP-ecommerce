import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import homeRouter from './routes/home/home.routes';
import apiRouter from './routes/api/index.routes';

import DB from './models/index';
import Logger from './config/winston';
import ErrorHandler from './middlewares/error.middleware';
import FormatResponse from './middlewares/response.middleware';

const app = express();

DB.connectDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./src/public'));

app.use(FormatResponse.format);

app.use('/', homeRouter);
app.use('/v1/api', apiRouter);

app.use(ErrorHandler.handle);

const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;

app.listen(PORT, HOST, () => {
  Logger.log('info', `Server is running http://${HOST}:${PORT}`, 200);
});
