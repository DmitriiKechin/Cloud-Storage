import { ObjectId, Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  email: string;
  password: string;
  diskSpace: number;
  usedSpace: number;
  avatar?: string;
  files?: ObjectId;
}
