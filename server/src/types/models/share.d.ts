import { Document } from 'mongoose';

export interface IShare extends Document {
  file: string;
  user: string;
}
