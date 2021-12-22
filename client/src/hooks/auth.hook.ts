import { useCallback, useState } from 'react';
import { IDataLogin, IUser, ObjectString, stringOrNull } from '../Types/types';

const storageName: string = 'userData';

interface IStorageUser {
  token: stringOrNull;
  user: IUser;
}

interface IUseAuth {
  login: { (token: string, user: IUser): void };
  logout: { (): void };
  auth(): void;
  token: stringOrNull;
  user: IUser | null;
}

export const useAuth = (): IUseAuth => {
  const [token, setToken] = useState<stringOrNull>(null);
  const [user, setUser] = useState<IUser | null>(null);

  const login = useCallback((token: string, user: IUser) => {
    setToken(token);
    setUser(user);

    localStorage.setItem(storageName, JSON.stringify({ token, user }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(storageName);
  }, []);

  const auth = useCallback(async (): Promise<void> => {
    const data: IStorageUser | null = JSON.parse(
      localStorage.getItem(storageName) || 'null'
    );
    console.log('auth');

    if (data && data.token) {
      const headers: ObjectString = {};
      headers['authorization'] = data.token || 'null';

      try {
        const response: Response = await fetch('/api/auth/auth', {
          method: 'GET',
          body: null,
          headers,
        });
        console.log('auth login');
        const data: IDataLogin = await response.json();
        login(data.token, data.user);
      } catch (e) {
        console.log('auth logout');
        logout();
      }
    }
  }, [login, logout]);

  return { login, logout, token, user, auth };
};
