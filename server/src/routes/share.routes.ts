import { Router } from 'express';
import ShareController from '../controllers/shareController';

const router = Router();

router.get('', ShareController.getFile);

export default router;
