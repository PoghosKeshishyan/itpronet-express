import { Router } from 'express';
import expressListEndpoints from 'express-list-endpoints';

const router = Router();

router.get('/', (req, res) => {
    const apiList = expressListEndpoints(req.app);
    res.render('index');
});

export default router;