import { storageName } from '../Types/auth';
import { ISettingUser, IUser } from '../Types/types';

export const setSettingUser = (settings: ISettingUser): void => {
  const user: IUser = JSON.parse(
    localStorage.getItem(storageName) || 'null'
  )?.user;
  if (!user) {
    return;
  }
  const usersSettings =
    JSON.parse(localStorage.getItem('usersSettings') || 'null') || {};

  if (!usersSettings[user._id]) {
    usersSettings[user._id] = {};
  }

  usersSettings[user._id] = { ...usersSettings[user._id], ...settings };

  localStorage.setItem('usersSettings', JSON.stringify(usersSettings));
};
