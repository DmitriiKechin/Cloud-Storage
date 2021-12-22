import { useCallback, useState } from 'react';
import { IDataLogin, IUser, ObjectString, stringOrNull } from '../Types/types';
import { useHttp } from './http.hook';

const storageName: string = 'userData';

interface IStorageUser {
  token: stringOrNull;
  user: IUser | null;
}

interface IUseAuth {
  login: { (dataUser: IDataLogin): void };
  logout: { (): void };
  auth(): void;
  token: stringOrNull;
  user: IUser | null;
}

export const useAuth = (): IUseAuth => {
  const [token, setToken] = useState<stringOrNull>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const { request } = useHttp();

  const login = useCallback((dataUser: IDataLogin) => {
    setToken(dataUser.token);
    setUser(dataUser.user);

    localStorage.setItem(
      storageName,
      JSON.stringify({ token: dataUser.token, user: dataUser.user })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(storageName);
  }, []);

  const auth = useCallback((): void => {
    const data: IStorageUser | null = JSON.parse(
      localStorage.getItem(storageName) || 'null'
    );
    console.log('auth');

    if (data && data.token) {
      const headers: ObjectString = {};
      headers['authorization'] = data.token || 'null';

      (async () => {
        try {
          const data: IDataLogin = await request(
            '/api/auth/auth',
            'GET',
            {},
            headers
          );
          console.log('auth login');
          login(data);
        } catch (e) {
          console.log('auth logout');
          logout();
        }
      })();
    }
  }, [login, logout, request]);

  return { login, logout, token, user, auth };
};
