import { ObjectId, Document } from 'mongoose';

export interface IFile extends Document {
  name: string;
  type: string;
  accessLink: string;
  size: number;
  path: string;
  user: ObjectId;
  parent: ObjectId;
  childs: ObjectId[];
}
