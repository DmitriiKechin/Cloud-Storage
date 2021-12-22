import { useContext } from 'react';
import { API_URL } from '../config';
import { GlobalContext } from '../contex/GlobalContext';
import { IUser } from '../Types/types';

interface IUserInfo {
  avatarSrc: string;
  userName: string;
  diskSpace: number;
  usedSpace: number;
  freeSpace: number;
  countFiles: number;
}

export const useUserInfo = (): IUserInfo => {
  const { auth } = useContext(GlobalContext);

  const userDefault: IUser = {
    diskSpace: 0,
    email: '',
    files: [],
    id: '',
    password: '',
    usedSpace: 0,
  };

  const user: IUser = auth.user || userDefault;
  const userInfo: IUserInfo = {
    avatarSrc: user.avatar || API_URL + 'UserDefault.svg',
    userName: user.email.split('@')[0],
    diskSpace: +(user.diskSpace / 1024 ** 3).toFixed(1),
    usedSpace: +(user.usedSpace / 1024 ** 3).toFixed(1),
    freeSpace: +((user.diskSpace - user.usedSpace) / 1024 ** 3).toFixed(1),
    countFiles: user.files.length,
  };
  return userInfo;
};
