import { Schema, model } from 'mongoose';
import { IFile } from '../types/types';

// const { model, ObjectId } = require('mongoose');

const File = new Schema<IFile>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  accessLink: { type: String },
  size: { type: Number, required: true, default: 0 },
  path: { type: String, default: '', required: true },
  user: { type: String, required: true },
  date: { type: Number, required: true },
  parent: { type: String, required: true },
  childs: [{ type: String }],
});

const FileModel = model<IFile>('File', File);
export default FileModel;
