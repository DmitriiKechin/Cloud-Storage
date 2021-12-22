import { IFile } from '../types/models/file';

const fs = require('fs');
//const File = require('../models/File');
const config = require('config');

class FileService {
  createDir(file: IFile) {
    const filePath: string = `${config.get('filePath')}\\${file.user}\\${
      file.path
    }`;
    console.log('filePath: ', filePath);

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
  }

  deleteFile(file: IFile) {
    const path = this.getPath(file);
    if (file.type === 'dir') {
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path);
    }
  }

  getPath(file: IFile): string {
    return config.get('filePath') + '\\' + file.user + '\\' + file.path;
  }
}

module.exports = new FileService();
