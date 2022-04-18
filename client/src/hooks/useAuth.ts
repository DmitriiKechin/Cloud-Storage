import { API_URL } from '../config';
import { loginAuthPayload, storageName } from '../Types/auth';
import { IDataLogin, ObjectString } from '../Types/types';
import { useAction } from './useAction';

export const useAuth = () => {
  const { login, logout, setMessage, loading } = useAction();

  const auth = async (token: string) => {
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

      login({ token: data.token, user: data.user });
    } catch (e: any) {
      setMessage(e.message);
      logout();
    }
  };

  const startAuth = () => {
    const data: loginAuthPayload | null = JSON.parse(
      localStorage.getItem(storageName) || 'null'
    );
    loading(true);

    if (data && data.token) {
      auth(data.token);
    }
    loading(false);
  };

  return { auth, startAuth };
};
