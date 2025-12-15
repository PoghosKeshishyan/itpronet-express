import { Router } from 'express';
import getHomePage from '../controllers/index.js';
import UsersRouter from './users.js';
import HeaderInfoRouter from './headerInfos.js';
import NavbarRouter from './navbars.js';

const router = Router();

router.get('/', getHomePage);
router.use('/api/users', UsersRouter);
router.use('/api/header_infos', HeaderInfoRouter);
router.use('/api/navbars', NavbarRouter);

export default router;