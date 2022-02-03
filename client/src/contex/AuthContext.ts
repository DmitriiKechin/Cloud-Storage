import { createContext } from 'react';
import { ISettingUser, IUser, stringOrNull } from '../Types/types';

interface IAuth {
  isAuthorization: boolean;
  login: { (token: string, user: IUser, isAuthorization: boolean): void };
  loading: boolean;
  logout: { (): void };
  setSettingUser: { (settings: ISettingUser): void };
  auth(token: string, isAuthorization: boolean): Promise<void>;
  token: stringOrNull;
  user: IUser | null;
}

const AuthContext = createContext<IAuth>({
  isAuthorization: false,
  token: null,
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  auth: async () => {},
  setSettingUser: () => {},
});

export default AuthContext;
