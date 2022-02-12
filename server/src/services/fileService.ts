import config from 'config';
import * as yandexDisk from '../yandexDisk';
import { IFile } from '../types/types';

const FileService = {
  createDir(file: IFile) {
    const filePath: string = this.getPath(file);
    yandexDisk.createFolderYandexDisk(filePath);
  },

  deleteFile(file: IFile) {
    const path = this.getPath(file);
    yandexDisk.deleteFileYandexDisk(path);
  },

  getPath(file: IFile): string {
    return config.get('filePath') + '/' + file.user + '/' + file.path;
  },
};

export default FileService;
