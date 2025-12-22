import { Router } from 'express';
import getHomePage from '../controllers/index.js';
import UsersRouter from './users.js';
import HeaderInfoRouter from './headerInfos.js';
import NavbarRouter from './navbars.js';
import SliderRouter from './sliders.js';
import ServicesRouter from './servicesSections.js';
import CounterRouter from './counters.js';
import ItsolutionRouter from './itsolutions.js';
import ServicesPagesRouter from './servicesPages.js';
import AboutPageRouter from './about-pages.js';
import AboutLogoRoter from './about-logos.js';
import ContactPageRouter from './contact-pages.js';
import FooterRouter from './footers.js';

const router = Router();

router.get('/', getHomePage);
router.use('/api/users', UsersRouter);
router.use('/api/header-infos', HeaderInfoRouter);
router.use('/api/navbars', NavbarRouter);
router.use('/api/sliders', SliderRouter);
router.use('/api/services-sections', ServicesRouter);
router.use('/api/counter-sections', CounterRouter);
router.use('/api/itsolutions', ItsolutionRouter);
router.use('/api/services-pages', ServicesPagesRouter);
router.use('/api/about-pages', AboutPageRouter);
router.use('/api/about-logos', AboutLogoRoter);
router.use('/api/contact-pages', ContactPageRouter);
router.use('/api/footers', FooterRouter);

export default router;