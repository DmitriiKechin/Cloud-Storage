import { useCallback, useEffect, useMemo, useState } from 'react';
import { API_URL } from '../config';
import AuthContext from '../contex/AuthContext';
import { useAction } from '../hooks/useAction';
import {
  IDataLogin,
  ISettingUser,
  IUser,
  ObjectString,
  stringOrNull,
} from '../Types/types';

const storageName: string = 'userData';

interface IStorageUser {
  token: stringOrNull;
  user: IUser;
}

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<stringOrNull>(null);
  const { setMessage } = useAction();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthorization, setAuthorization] = useState(false);

  const login = useCallback(
    (token: string, user: IUser, isAuthorization: boolean) => {
      setToken(token);
      setUser(user);

      if (!isAuthorization) {
        setAuthorization(true);
      }

      console.log('login');
      localStorage.setItem(storageName, JSON.stringify({ token, user }));
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setAuthorization(false);
    localStorage.removeItem(storageName);
  }, []);

  const setSettingUser = useCallback((settings: ISettingUser): void => {
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
  }, []);

  const auth = useCallback(
    async (token: string, isAuthorization: boolean): Promise<void> => {
      const headers: ObjectString = {};
      headers['authorization'] = token || 'null';

      try {
        const response: Response = await fetch(API_URL + '/api/auth/auth', {
          method: 'GET',
          body: null,
          headers,
        });
        const data: IDataLogin = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Что то пошло не так');
        }

        login(data.token, data.user, isAuthorization);
      } catch (e: any) {
        console.log('logout');
        setMessage(e.message);
        logout();
      }
    },
    [login, logout, setMessage]
  );

  useEffect(() => {
    (async () => {
      const data: IStorageUser | null = JSON.parse(
        localStorage.getItem(storageName) || 'null'
      );
      // console.log('auth');

      if (data && data.token) {
        setLoading(true);
        await auth(data.token, isAuthorization);
      }
      setLoading(false);
    })();
  }, [auth, isAuthorization]);

  const contextValue = useMemo(
    () => ({
      isAuthorization,
      loading,
      login,
      logout,
      token,
      user,
      auth,
      setSettingUser,
    }),
    [login, logout, token, user, auth, loading, isAuthorization, setSettingUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
