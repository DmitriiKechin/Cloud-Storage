import express from 'express';
import fileService from '../services/fileService';
import fs from 'fs';
import config from 'config';
import * as uuid from 'uuid';
import File from '../models/File';
import User from '../models/User';
import Share from '../models/Share';
import * as yandexDisk from '../yandexDisk';
import path from 'path';
import { IFile, IShare, IUser } from '../types/types';

const FileController = {
  async renameFile(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    try {
      let { name, id } = req.body;
      name = name.trim();
      const file: IFile | null = await File.findOne({ _id: id });

      if (!file) {
        return res.status(400).json({ message: 'Error rename' });
      }

      file.name = name;
      await file.save();

      return res.json({ message: 'Success' });
    } catch (e: any) {
      console.log(e);

      return res.status(400).json({ message: 'Error rename' });
    }
  },

  async shareFile(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    try {
      const { fileId } = req.body;
      const file: IFile | null = await File.findOne({ _id: fileId });

      if (!file) {
        return res.status(400).json({ message: 'Error file' });
      }

      if (file.type === 'dir') {
        return res.status(400).json({ message: `Can't share folder` });
      }

      if (file.accessLink) {
        return res.json({ accessLink: file.accessLink });
      }

      const shareLink: IShare = new Share({
        file: file._id,
        user: req.user?.id,
      });

      file.accessLink =
        config.get('urlBase') + '/api/share?id=' + shareLink._id;

      await file.save();
      await shareLink.save();

      return res.json({ accessLink: file.accessLink });
    } catch (e: any) {
      console.log(e);

      return res.status(400).json({ message: 'Error share file' });
    }
  },

  async createDir(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    try {
      const { type, parent } = req.body;
      let { name } = req.body;
      name = name.trim();

      const user: IUser | null = await User.findOne({ _id: req.user?.id });
      const file: IFile = new File({
        name,
        type,
        size: 0,
        parent,
        path: name,
        date: Date.now(),
        user: req.user?.id,
      });
      const parentFile = await File.findOne({ _id: parent });

      if (!user) {
        throw new Error('User not find');
      }

      if (parentFile) {
        file.path = `${parentFile.path}/${file.name}`;
        parentFile.childs.push(file._id);
        await parentFile.save();
      }

      user.folders++;

      await fileService.createDir(file);
      await Promise.all([file.save(), user.save()]);

      return res.json(file);
    } catch (e: any) {
      console.log(e);
      return res.status(400).json({ message: 'Error create folder' });
    }
  },

  async getFiles(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    try {
      const { sort, parent }: { sort?: string; parent?: string } = req.query;

      if (!parent) {
        return res.status(500).json({ message: 'Can not get files' });
      }

      let files: IFile[];

      switch (sort) {
        case 'name':
          files = await File.find({
            user: req.user?.id,
            parent: parent,
          }).sort({ name: 1 });
          break;

        case 'type':
          files = await File.find({
            user: req.user?.id,
            parent: parent,
          }).sort({ type: 1 });
          break;

        case 'date':
          files = await File.find({
            user: req.user?.id,
            parent: parent,
          }).sort({ date: 1 });
          break;

        case 'size':
          files = await File.find({
            user: req.user?.id,
            parent: parent,
          }).sort({ size: -1 });
          break;

        default:
          files = await File.find({
            user: req.user?.id,
            parent: parent,
          });
      }

      return res.json({ files });
    } catch (e: any) {
      return res.status(500).json({ message: 'Can not get files' });
    }
  },

  async uploadFile(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    try {
      const { name } = req.body;
      const size = +req.body.size;

      const [parent, user] = await Promise.all([
        File.findOne({
          user: req.user?.id,
          _id: req.body.parent,
        }),
        User.findOne({ _id: req.user?.id }),
      ]);

      if (!user) {
        return res.status(500).json({ message: 'Upload error/ User Error ' });
      }

      if (user.usedSpace + size > user.diskSpace) {
        return res.status(400).json({ message: 'There no space on the disk' });
      }

      user.usedSpace = user.usedSpace + size;
      user.files++;

      let path;

      if (parent) {
        path = `${config.get('filePath')}/${user._id}/${parent.path}/${name}`;
      } else {
        path = `${config.get('filePath')}/${user._id}/${name}`;
      }

      const link = await yandexDisk.getUplodLink(path);

      const type: string = name.split('.').pop();
      let filePath: string = name;

      if (parent) {
        filePath = parent.path + '/' + name;
      }

      const isExistsFile = await File.findOne({
        user: req.user?.id,
        path: filePath,
      });

      if (isExistsFile) {
        return res.status(500).json({ message: 'file already exists' });
      }

      const dbFile: IFile = new File({
        name: name,
        type,
        date: Date.now(),
        size: size,
        path: filePath,
        parent: parent?._id || user._id,
        user: user._id,
      });

      if (parent) {
        parent.childs.push(dbFile._id);
        await parent.save();
      }

      await Promise.all([
        this.resizeParent(dbFile, user, dbFile.size),
        dbFile.save(),
        user.save(),
      ]);

      return res.json({ href: link });
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ message: 'Upload error' });
    }
  },

  async downloadFile(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response | void> {
    try {
      const file: IFile | null = await File.findOne({
        _id: req.query.id,
        user: req.user?.id,
      });

      if (!file) {
        return res.status(400).json({ message: 'Download error/not file' });
      }

      const path: string =
        // config.get('filePath') + '\\' + req.user?.id + '\\' + file.path;
        config.get('filePath') + '/' + req.user?.id + '/' + file.path;

      const publicKey = await yandexDisk.getDownloadLink(path);
      return res.json(publicKey);
    } catch (e: any) {
      console.log(e);
      res.status(500).json({ message: 'Download error' });
    }
  },

  async deleteFile(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    try {
      const user: IUser | null = await User.findOne({ _id: req.user?.id });

      const file = await File.findOne({
        _id: req.query.id,
        user: req.user?.id,
      });

      if (!user) {
        return res.status(400).json({ message: 'Error delete/ not User' });
      }

      if (!file) {
        return res.status(400).json({ message: 'file not found' });
      }

      const parent = await File.findOne({
        _id: file.parent,
        user: req.user?.id,
      });

      if (file.accessLink) {
        const share = await Share.findOne({
          file: file._id,
        });

        if (!share) {
          return res.status(400).json({ message: 'error delete share link' });
        }

        await share.remove();
      }

      await this.deleteFileChilds(file, user);
      fileService.deleteFile(file);

      user.usedSpace -= file.size;
      this.resizeParent(file, user, -file.size);

      if (file.type === 'dir') {
        user.folders--;
      } else {
        user.files--;
      }

      if (parent) {
        parent.childs.splice(parent.childs.indexOf(file._id), 1);
        await parent.save();
      }

      await file.remove();
      await user.save();

      return res.json({ message: 'File was deleted' });
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({ message: 'Delete error' });
    }
  },

  async uploadAvatar(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    try {
      const file = req.files.file;
      const user: IUser | null = await User.findById(req.user?.id);

      if (!user) {
        return res
          .status(400)
          .json({ message: 'Upload avatar error/User error' });
      }

      if (user.avatar) {
        const pathAvatar =
				path.join(__dirname, '../../../client','build') + '/' + user.avatar;
        if (fs.existsSync(pathAvatar)) {
          fs.unlinkSync(pathAvatar);
        }
      }

      const avatarName = uuid.v4() + '.jpg';

      file.mv(
        path.join(__dirname, '../../../client', 'build') + '/' + avatarName
      );
      user.avatar = avatarName;
      await user.save();

      return res.json({ message: 'avatar upload' });
    } catch (e: any) {
      console.log(e);
      return res.status(400).json({ message: 'Upload avatar error' });
    }
  },

  async deleteAvatar(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    try {
      const user: IUser | null = await User.findById(req.user?.id);

      if (!user) {
        return res
          .status(400)
          .json({ message: 'Upload avatar error/User error' });
      }

      fs.unlinkSync(
        path.join(__dirname, '../../../client','build') + '/' + user.avatar
      );
      user.avatar = '';
      await user.save();
      return res.json(user);
    } catch (e: any) {
      console.log(e);
      return res.status(400).json({ message: 'Upload avatar error' });
    }
  },

  async deleteFileChilds(file: IFile, user: IUser): Promise<void> {
    const files = await File.find({
      user: file.user,
      parent: file._id,
    });

    if (files.length === 0) {
      return;
    }

    files.forEach(async (file) => {
      if (file.type === 'dir') {
        user.folders--;
      } else {
        user.files--;
      }

      if (file.accessLink) {
        const share = await Share.findOne({
          file: file._id,
        });

        if (share) {
          await share.remove();
        }
      }

      await file.remove();
      await this.deleteFileChilds(file, user);
    });
  },

  async resizeParent(file: IFile, user: IUser, resize: number): Promise<void> {
    if (!file || !user || !resize) {
      return;
    }

    const parent = await File.findOne({
      user: file.user,
      _id: file.parent,
    });

    if (!parent) {
      return;
    }

    parent.size += resize;
    parent.save();

    this.resizeParent(parent, user, resize);
  },
};

export default FileController;
