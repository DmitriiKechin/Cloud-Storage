import { createContext, Dispatch, SetStateAction } from 'react';
import { IDataLogin, IUser, stringOrNull } from '../Types/types';

interface IMessage {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  isText: boolean;
  setIsText: Dispatch<SetStateAction<boolean>>;
}

interface IAuth {
  login: { (dataUser: IDataLogin): void };
  logout: { (): void };
  token: stringOrNull;
  user: IUser | null;
  isAuthenticated: boolean;
  requestCount: number;
  setRequestCount: Dispatch<SetStateAction<number>>;
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
    requestCount: 0,
    setRequestCount: () => {},
  },
});
