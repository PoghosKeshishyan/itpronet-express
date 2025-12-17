import { Router } from 'express';
import { all, footer, add, edit, remove } from "../controllers/footers.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get('/', all);
router.get('/:id', footer);
router.post('/', auth, add);
router.put('/:id', auth, edit);
router.delete('/:id', auth, remove);

export default router;