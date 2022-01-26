import { Router } from 'express';
// const Router = require('express');
import authMiddleware from '../middleware/auth.middleware';
import FileController from '../controllers/fileController';

const router = Router();

router.post('', authMiddleware, FileController.createDir.bind(FileController));
router.post(
  '/upload',
  authMiddleware,
  FileController.uploadFile.bind(FileController)
);
router.post('/avatar', authMiddleware, FileController.uploadAvatar);
router.post('/share', authMiddleware, FileController.shareFile);
router.post(
  '/rename',
  authMiddleware,
  FileController.renameFile.bind(FileController)
);
router.get('', authMiddleware, FileController.getFiles);
router.get('/download', authMiddleware, FileController.downloadFile);
router.delete(
  '/',
  authMiddleware,
  FileController.deleteFile.bind(FileController)
);
router.delete('/avatar', authMiddleware, FileController.deleteAvatar);

export default router;
