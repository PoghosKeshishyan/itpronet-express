import { Router } from 'express';
import getHomePage from '../controllers/index.js';
import UsersRouter from './users.js';
import HeaderInfoRouter from './headerInfos.js';
import NavbarRouter from './navbars.js';
import SliderRouter from './sliders.js';
import ServicesRouter from './servicesSections.js';

const router = Router();

router.get('/', getHomePage);
router.use('/api/users', UsersRouter);
router.use('/api/header_infos', HeaderInfoRouter);
router.use('/api/navbars', NavbarRouter);
router.use('/api/sliders', SliderRouter);
router.use('/api/services_sections', ServicesRouter);

export default router;