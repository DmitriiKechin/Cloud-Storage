import { IUser } from '../types';

//import { Exspress } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      files?: any;
    }
  }
}
//declare module 'ExspressTypes';
//export interface Request {
// user: IUser;
//}
