import { API_URL } from '../config';
import formattedSize from '../helpers/formattedSize';
import { IUser } from '../Types/types';
import { useTypedSelector } from './useTypedSelector';

interface IUserInfo {
  id: string;
  avatarSrc: string;
  userName: string;
  diskSpace: string;
  usedSpace: string;
  freeSpace: string;
  countFiles: number;
  countFolders: number;
}

export const useUserInfo = (): IUserInfo => {
  // const auth = useAuth();
  const { user: userState } = useTypedSelector((state) => state.auth);
  const userDefault: IUser = {
    diskSpace: 0,
    email: '',
    files: 0,
    folders: 0,
    _id: '',
    password: '',
    usedSpace: 0,
  };

  const user: IUser = userState || userDefault;
  const userInfo: IUserInfo = {
    id: user._id,
    avatarSrc: user.avatar || API_URL + '/UserDefault.svg',
    userName: user.email.split('@')[0],
    diskSpace: formattedSize(user.diskSpace),
    usedSpace: formattedSize(user.usedSpace),
    freeSpace: formattedSize(user.diskSpace - user.usedSpace),
    countFiles: user.files,
    countFolders: user.folders,
  };
  return userInfo;
};
