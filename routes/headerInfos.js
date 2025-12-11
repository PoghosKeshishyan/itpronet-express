import { Router } from 'express';
import { all, header_info, add, edit, remove, } from "../controllers/headerInfos.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get('/', all);
router.get('/:id', header_info);
router.post('/', auth, add);
router.put('/:id', auth, edit);
router.delete('/:id', auth, remove);

export default router;
