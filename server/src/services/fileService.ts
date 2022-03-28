import config from 'config';
import { IFile } from '../types/types';

class FileService {
  static createDir(file: IFile) {
    const filePath: string = this.getPath(file);
    yandexDisk.createFolderYandexDisk(filePath);
  },

  static deleteFile(file: IFile) {
    const path = this.getPath(file);
    yandexDisk.deleteFileYandexDisk(path);
  },

  getPath(file: IFile): string {

    return config.get('filePath') + '/' + file.user + '/' + file.path;
  }
}

export default FileService;
