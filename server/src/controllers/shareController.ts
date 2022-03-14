import express from 'express';
import config from 'config';
import File from '../models/File';
import Share from '../models/Share';
import * as yandexDisk from '../yandexDisk';
import path from 'path';
import { IShare } from '../types/types';

const fetch = require('node-fetch');

class ShareController {
  static async getDownloadPage(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response | void> {
    let { id } = req.query;
    let name = 'Can not get file';

    const shareLink: IShare | null = await Share.findOne({ _id: id });

    if (!shareLink) {
      id = '0';
      return res.render(
        path.resolve(__dirname, '../../../client', 'build', 'download.ejs'),
        { id, name }
      );
    }

    const file = await File.findById(shareLink.file);

    if (!file) {
      id = '0';
      return res.render(
        path.resolve(__dirname, '../../../client', 'build', 'download.ejs'),
        { id, name }
      );
    }

    name = file.name;

    return res.render(
      path.resolve(__dirname, '../../../client', 'build', 'download.ejs'),
      { id, name }
    );
  }

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
        config.get('filePath') + '/' + shareLink.user + '/' + file.path;

      const downloadLink = await yandexDisk.getDownloadLink(path);
      const response = await fetch(downloadLink);

      if (!response.ok) {
        return res.status(400).json({ message: 'Download error/not file' });
      }
      res.set('Content-Length', response.headers.get('Content-Length'));
      response.body.pipe(res);
    } catch (e: any) {
      return res.status(500).json({ message: 'Can not get file' });
    }
  }
}

export default ShareController;
