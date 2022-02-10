import express from 'express';
import fs from 'fs';
import config from 'config';
import File from '../models/File';
import Share from '../models/Share';
import { IShare } from '../types/models/share';
import * as yandexDisk from '../yandexDisk';
import path1 from 'path';

class ShareController {
  static linkDownload = '';

  static async getFile(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response | void> {
    try {
      const { id } = req.query;

      const shareLink: IShare | null = await Share.findOne({ _id: id });

      if (!shareLink) {
        return res.status(500).json({ message: 'Can not get file' });
      }

      const file = await File.findById(shareLink.file);

      if (!file) {
        return res.status(400).json({ message: 'Download error/not file' });
      }

      const path: string =
        // config.get('filePath') + '\\' + shareLink.user + '\\' + file.path;
        config.get('filePath') + '/' + shareLink.user + '/' + file.path;

      // if (!fs.existsSync(path)) {
      //   res.status(500).json({ message: 'Can not get file' });
      // }

      ShareController.linkDownload = await yandexDisk.getDownloadLink(path);

      setTimeout(() => {
        ShareController.linkDownload = '';
      }, 5000);

      res.sendFile(
        path1.resolve(__dirname, '../../../static', 'download.html')
      );

      // return res.download(url, file.name);
      // return res.download(path, file.name);
    } catch (e: any) {
      return res.status(500).json({ message: 'Can not get file' });
    }
  }

  static getLinkDownload(req: express.Request, res: express.Response) {
    if (!ShareController.linkDownload) {
      return res.status(500).json({ message: 'Can not get file' });
    }
    return res.json({ link: ShareController.linkDownload });
  }
}

export default ShareController;
