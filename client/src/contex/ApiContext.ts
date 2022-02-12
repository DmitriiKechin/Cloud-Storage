import { createContext } from 'react';
import { IDataLogin, IFile, ObjectString, typeSort } from '../Types/types';

interface IAuth {
  registration(data: ObjectString): Promise<IDataLogin>;
  login(data: ObjectString): Promise<IDataLogin>;
}

interface IFiles {
  getFiles(currentDir: string, typeSort: typeSort): Promise<IFile[]>;
  upLoadAvatar(data: FormData): Promise<void>;
  createDir(data: ObjectString): Promise<IFile>;
  uploadFile(
    data: FormData,
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    callback: () => void
  ): () => void;
  downloadFile(id: string, fileName: string): Promise<void>;
  deleteFile(id: string): Promise<void>;
  renameFile(name: string, id: string): Promise<void>;
  shareFile(fileId: string): Promise<string>;
}

interface IApi {
  auth: IAuth;
  file: IFiles;
}

export const APIContext = createContext<IApi | null>(null);
