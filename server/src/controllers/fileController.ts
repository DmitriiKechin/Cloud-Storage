import { IFile } from '../types/models/file';
import * as express from 'express';
import { IUser } from '../types/models/user';
import { ILoginResponse } from '../types/response/login';

const fileService = require('../services/fileService');
const File = require('../models/File');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');
const uuid = require('uuid');

class FileController {
  async createDir(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    try {
      const { name, type, parent } = req.body;
      const file: IFile = new File({ name, type, parent, user: req.user?.id });
      const parentFile = await File.findOne({ _id: parent });

      if (!parentFile) {
        file.path = name;
        await fileService.createDir(file);
      } else {
        file.path = `${parentFile.path}\\${file.name}`;
        await fileService.createDir(file);
        parentFile.childs.push(file._id);
        await parentFile.save();
      }

      await file.save();

      return res.json(file);
    } catch (e: any) {
      console.log(e);
      return res.status(400).json({ message: 'Error create folder' });
    }
  }

  async getFiles(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    try {
      const { sort } = req.query;
      let files;

      switch (sort) {
        case 'name':
          files = await File.find({
            user: req.user?.id,
            parent: req.query.parent,
          }).sort({ name: 1 });
          break;

        case 'type':
          files = await File.find({
            user: req.user?.id,
            parent: req.query.parent,
          }).sort({ type: 1 });
          break;

        case 'date':
          files = await File.find({
            user: req.user?.id,
            parent: req.query.parent,
          }).sort({ date: 1 });
          break;

        default:
          files = await File.find({
            user: req.user?.id,
            parent: req.query.parent,
          });
      }

      return res.json({ files });
    } catch (e: any) {
      return res.status(500).json({ message: 'Can not get files' });
    }
  }

  async uploadFile(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    try {
      const file = req.files.file;

      const parent = await File.findOne({
        user: req.user?.id,
        _id: req.body.parent,
      });
      const user: IUser = await User.findOne({ _id: req.user?.id });

      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({ message: 'There no space on the disk' });
      }

      user.usedSpace = user.usedSpace + file.size;

      let path;
      if (parent) {
        path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${
          file.name
        }`;
      } else {
        path = `${config.get('filePath')}\\${user._id}\\${file.name}`;
      }

      if (fs.existsSync(path)) {
        return res.status(400).json({ message: 'File already exist' });
      }

      file.mv(path);

      const type: string = file.name.split('.').pop();
      let filePath: string = file.name;

      if (parent) {
        filePath = parent.path + '\\' + file.name;
      }
      const dbFile: IFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: filePath,
        parent: parent?._id,
        user: user._id,
      });

      await dbFile.save();
      await user.save();

      return res.json(dbFile);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ message: 'Upload error' });
    }
  }

  async downloadFile(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response | void> {
    try {
      const file: IFile = await File.findOne({
        _id: req.query.id,
        user: req.user?.id,
      });
      const path: string =
        config.get('filePath') +
        '\\' +
        req.user?.id +
        '\\' +
        file.path +
        '\\' +
        file.name;

      if (fs.existsSync(path)) {
        return res.download(path, file.name);
      }
      return res.status(400).json({ message: 'Download error' });
    } catch (e: any) {
      console.log(e);
      res.status(500).json({ message: 'Download error' });
    }
  }

  async deleteFile(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    try {
      const file = await File.findOne({
        _id: req.query.id,
        user: req.user?.id,
      });

      if (!file) {
        return res.status(400).json({ message: 'file not found' });
      }

      fileService.deleteFile(file);
      await file.remove();
      return res.json({ message: 'File was deleted' });
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ message: 'Delete error' });
    }
  }

  async uploadAvatar(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    try {
      const response: ILoginResponse = { message: '' };
      const file = req.files.file;
      const user = await User.findById(req.user?.id);

      if (user.avatar) {
        fs.unlinkSync(config.get('staticPath') + '\\' + user.avatar);
      }

      const avatarName = uuid.v4() + '.jpg';
      file.mv(config.get('staticPath') + '\\' + avatarName);
      user.avatar = avatarName;
      await user.save();

      return res.json({ message: 'avatar upload' });
    } catch (e: any) {
      console.log(e);
      return res.status(400).json({ message: 'Upload avatar error' });
    }
  }

  async deleteAvatar(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    try {
      const user = await User.findById(req.user?.id);
      fs.unlinkSync(config.get('staticPath') + '\\' + user.avatar);
      user.avatar = '';
      await user.save();
      return res.json(user);
    } catch (e: any) {
      console.log(e);
      return res.status(400).json({ message: 'Upload avatar error' });
    }
  }
}

module.exports = new FileController();
