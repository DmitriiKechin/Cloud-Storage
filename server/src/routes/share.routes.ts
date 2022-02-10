import { Router } from 'express';
// const Router = require('express');
import ShareController from '../controllers/shareController';

const router = Router();

router.get('', ShareController.getFile);
router.get('/getLink', ShareController.getLinkDownload);

export default router;
