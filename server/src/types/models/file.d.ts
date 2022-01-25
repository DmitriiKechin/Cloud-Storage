import { ObjectId, Document, Types } from 'mongoose';
import { IUser } from './user';

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
