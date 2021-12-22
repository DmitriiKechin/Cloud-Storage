import { createContext, Dispatch, SetStateAction } from 'react';
import { IUser, stringOrNull } from '../Types/types';

interface IMessage {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  isText: boolean;
  setIsText: Dispatch<SetStateAction<boolean>>;
}

interface IAuth {
  login: { (token: string, user: IUser): void };
  logout: { (): void };
  token: stringOrNull;
  user: IUser | null;
  isAuthenticated: boolean;
}

interface IGlobalContext {
  modal: IMessage;
  auth: IAuth;
}

export const GlobalContext = createContext<IGlobalContext>({
  modal: {
    message: '',
    setMessage: () => {},
    isText: false,
    setIsText: () => {},
  },
  auth: {
    token: null,
    user: null,
    login: () => {},
    logout: () => {},
    isAuthenticated: false,
  },
});
