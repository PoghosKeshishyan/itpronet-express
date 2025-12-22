import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import logger from 'morgan';
import BaseUrlMiddleware from './middlewares/base-url.js';
import AppRouter from './routes/index.js';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(BaseUrlMiddleware);
app.use(AppRouter);

app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
});