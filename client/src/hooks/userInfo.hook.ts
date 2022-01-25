import { API_URL } from '../config';
import formattedSize from '../global_Function/formattedSize';
import { IUser } from '../Types/types';
import useAuth from './auth.hook';

interface IUserInfo {
  id: string;
  avatarSrc: string;
  userName: string;
  diskSpace: number;
  usedSpace: string;
  freeSpace: number;
  countFiles: number;
  countFolders: number;
}

export const useUserInfo = (): IUserInfo => {
  const auth = useAuth();

  const userDefault: IUser = {
    diskSpace: 0,
    email: '',
    files: 0,
    folders: 0,
    _id: '',
    password: '',
    usedSpace: 0,
  };

  const user: IUser = auth.user || userDefault;
  const userInfo: IUserInfo = {
    id: user._id,
    avatarSrc: user.avatar || API_URL + 'UserDefault.svg',
    userName: user.email.split('@')[0],
    diskSpace: +(user.diskSpace / 1024 ** 3).toFixed(1),
    usedSpace: formattedSize(user.usedSpace),
    freeSpace: +((user.diskSpace - user.usedSpace) / 1024 ** 3).toFixed(1),
    countFiles: user.files,
    countFolders: user.folders,
  };
  return userInfo;
};
