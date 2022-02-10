import { Document } from 'mongoose';

export interface ILoginResponse {
  token?: string;
  user?: IUser;
  message: string;
}

export interface IRegistrationResponse {
  message: string;
}

export interface IFile extends Document {
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

export interface IShare extends Document {
  file: string;
  user: string;
}

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  diskSpace: number;
  usedSpace: number;
  avatar?: string;
  files: number;
  folders: number;
}
