import { Router } from 'express';
import { all, page, add, edit, remove } from "../controllers/contact-pages.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get('/', all);
router.get('/:id', page);
router.post('/', auth, add);
router.put('/:id', auth, edit);
router.delete('/:id', auth, remove);

export default router;