import { IFile } from '../types/models/file';
import express from 'express';
import { IUser } from '../types/models/user';
import fileService from '../services/fileService';
import fs from 'fs';
import config from 'config';
import * as uuid from 'uuid';
import File from '../models/File';
import User from '../models/User';
import Share from '../models/Share';
import { IShare } from '../types/models/share';

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
        file.path = `${parentFile.path}\\${file.name}`;
        parentFile.childs.push(file._id);
        await parentFile.save();
      }

      user.folders++;

      await fileService.createDir(file);
      await file.save();
      await user.save();

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
      const file = req.files.file;

      if (!file) {
        return res.status(500).json({ message: 'Upload error/not file' });
      }

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

      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({ message: 'There no space on the disk' });
      }

      user.usedSpace = user.usedSpace + file.size;
      user.files++;

      await parent;
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

      const type: string = file.name.split('.').pop();
      let filePath: string = file.name;

      if (parent) {
        filePath = parent.path + '\\' + file.name;
      }

      const dbFile: IFile = new File({
        name: file.name,
        type,
        date: Date.now(),
        size: file.size,
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

      file.mv(path);

      return res.json(dbFile);
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
        config.get('filePath') + '\\' + req.user?.id + '\\' + file.path;

      if (fs.existsSync(path)) {
        return res.download(path, file.name);
      }
      return res.status(400).json({ message: 'Download error' });
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

      fs.unlinkSync(config.get('staticPath') + '\\' + user.avatar);
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

  // async renamePathChild(file: IFile, oldName: string, newName: string) {
  //   console.log('yes');
  //   const files = await File.find({
  //     user: file.user,
  //     parent: file._id,
  //   });

  //   console.log('files: ', files);

  //   if (files.length === 0) {
  //     return;
  //   }
  //   console.log('no');
  //   files.forEach(async (file) => {
  //     const pathArray = file.path.split('\\');
  //     pathArray[pathArray.indexOf(oldName)] = newName;
  //     file.path = pathArray.join('\\');

  //     await file.save();
  //     this.renamePathChild(file, oldName, newName);
  //   });
  // },
};

export default FileController;
