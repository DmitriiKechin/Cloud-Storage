import { Schema, model } from 'mongoose';
import { IUser } from '../types/models/user';

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  diskSpace: { type: Number, default: 1024 ** 3 * 10 },
  usedSpace: { type: Number, default: 0 },
  avatar: { type: String },
  files: { type: Number, default: 0 },
  folders: { type: Number, default: 0 },
});

const User = model<IUser>('User', UserSchema);
export default User;
