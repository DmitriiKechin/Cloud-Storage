import { Router } from 'express';
// const Router = require('express');
import ShareController from '../controllers/shareController';

const router = Router();

router.get('', ShareController.getFile);

export default router;
