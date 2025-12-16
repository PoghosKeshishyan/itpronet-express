import { Router } from 'express';
import { all, section, add, edit, remove } from "../controllers/servicesSections.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get('/', all);
router.get('/:id', section);
router.post('/', auth, add);
router.put('/:id', auth, edit);
router.delete('/:id', auth, remove);

export default router;