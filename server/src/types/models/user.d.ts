import { Document } from 'mongoose';
import { IFile } from './file';

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
