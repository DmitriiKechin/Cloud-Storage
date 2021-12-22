export interface ObjectString {
  [key: string]: string;
}

export type stringOrNull = string | null;

export interface IFile {
  name: string;
  type: string;
  accessLink: string;
  size: number;
  path: string;
  user: IUser;
  parent: IFile;
  childs: IFile[];
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  diskSpace: number;
  usedSpace: number;
  avatar?: string;
  files: IFile[];
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
