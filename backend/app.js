import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { url } from 'inspector';
import bodyParser from 'body-parser';

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

import assetRouter from './routes/asset.routes.js'
import userRouter from './routes/user.routes.js'

app.use('/api/v1/users',userRouter);
app.use('/api/v1/assets',assetRouter);
export {app};