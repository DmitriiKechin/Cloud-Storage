// import fs from 'fs';
import * as fs from 'fs-extra';
import config from 'config';
import * as yandexDisk from '../yandexDisk';
import { IFile } from '../types/types';

const FileService = {
  createDir(file: IFile) {
    const filePath: string = this.getPath(file);
    yandexDisk.createFolderYandexDisk(filePath);

    // return new Promise<{ message: string }>((resolve, reject) => {
    //   try {
    //     if (!fs.existsSync(filePath)) {
    //       fs.mkdirSync(filePath);
    //       return resolve({ message: 'File was created' });
    //     } else {
    //       return reject({ message: 'File already exist' });
    //     }
    //   } catch (e: any) {
    //     return reject({ message: 'File error' });
    //   }
    // });
  },

  deleteFile(file: IFile) {
    const path = this.getPath(file);
    // if (file.type === 'dir') {
    //   fs.removeSync(path);
    // } else {
    //   fs.unlinkSync(path);
    // }
    yandexDisk.deleteFileYandexDisk(path);
  },

  getPath(file: IFile): string {
    // return config.get('filePath') + '\\' + file.user + '\\' + file.path;
    return config.get('filePath') + '/' + file.user + '/' + file.path;
  },
};

export default FileService;
