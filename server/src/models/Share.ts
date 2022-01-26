import { Schema, model } from 'mongoose';
import { IShare } from '../types/models/share';

const Share = new Schema<IShare>({
  file: { type: String, required: true },
  user: { type: String, required: true },
});

const ShareModel = model<IShare>('Share', Share);
export default ShareModel;
