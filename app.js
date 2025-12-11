import express from 'express';
import path, { dirname } from 'path';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import 'dotenv/config';

import IndexRouter from './routes/index.js';
import UsersRouter from './routes/users.js';
import HeaderInfoRouter from './routes/headerInfos.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', IndexRouter);
app.use('/api/users', UsersRouter);
app.use('/api/header_infos', HeaderInfoRouter);

app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
});