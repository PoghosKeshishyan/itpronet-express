import { Router } from 'express';
import UsersRouter from './users.js';

const router = Router();

router.use('/users', UsersRouter);

export default router;