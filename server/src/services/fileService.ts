import { IFile } from '../types/models/file';
// import fs from 'fs';
import * as fs from 'fs-extra';
import config from 'config';

const FileService = {
  createDir(file: IFile) {
    const filePath: string = `${config.get('filePath')}\\${file.user}\\${
      file.path
    }`;

    return new Promise<{ message: string }>((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: 'File was created' });
        } else {
          return reject({ message: 'File already exist' });
        }
      } catch (e: any) {
        return reject({ message: 'File error' });
      }
    });
  },

  deleteFile(file: IFile) {
    const path = this.getPath(file);
    if (file.type === 'dir') {
      fs.removeSync(path);
    } else {
      fs.unlinkSync(path);
    }
  },

  getPath(file: IFile): string {
    return config.get('filePath') + '\\' + file.user + '\\' + file.path;
  },

  //   rename(file: IFile, oldPath: string) {
  //     const path1 = this.getPath(file);
  //     console.log('path: ', path1);
  //     console.log('oldPath: ', oldPath);

  //     if (!fs.existsSync(path1) && fs.existsSync(oldPath)) {
  //       fs.moveSync(oldPath, path1);
  //     } else throw new Error('file already exists');
  //   },
};

export default FileService;
