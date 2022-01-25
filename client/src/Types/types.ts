export interface ObjectString {
  [key: string]: string;
}

export type stringOrNull = string | null;
export type typeSort = 'Name' | 'Size' | 'Date' | 'Type';

export interface IFile {
  _id: string;
  name: string;
  type: string;
  accessLink: string;
  size: number;
  path: string;
  user: string;
  date: number;
  parent: string;
  childs: string[];
}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  diskSpace: number;
  usedSpace: number;
  avatar?: string;
  files: number;
  folders: number;
}

export interface IDataLogin {
  token: string;
  user: IUser;
  message: string;
}

export interface IFileResponse {
  token: string;
  message: string;
  file: IFile;
}

export interface IFileComponents {
  id: string;
  type: string;
  name: string;
  parent: string;
}
