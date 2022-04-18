import { Dispatch } from 'redux';
import { API_URL } from '../../config';
import {
  AuthAction,
  authActionTypes,
  loginAuthPayload,
  storageName,
} from '../../Types/auth';
import { IDataLogin, ObjectString } from '../../Types/types';
import { setMessage } from './message';

export const login = (payload: loginAuthPayload) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: authActionTypes.LOGIN_AUTH, payload });
    localStorage.setItem(
      storageName,
      JSON.stringify({ token: payload.token, user: payload.user })
    );
  };
};

export const logout = () => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: authActionTypes.LOGOUT_AUTH });
    localStorage.removeItem(storageName);
  };
};

export const auth = (token: string) => {
  return async (
    dispatch: Dispatch<AuthAction> | ((dispatch: any) => Promise<void>)
  ) => {
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

      dispatch(login({ token: data.token, user: data.user }));
    } catch (e: any) {
      dispatch(setMessage(e.message));
      dispatch(logout());
    }
  };
};

export const startAuth = () => {
  return async (
    dispatch: Dispatch<AuthAction> | ((dispatch: any) => Promise<void>)
  ) => {
    const data: loginAuthPayload | null = JSON.parse(
      localStorage.getItem(storageName) || 'null'
    );
    dispatch({ type: authActionTypes.LOADING_AUTH, payload: true });

    if (data && data.token) {
      dispatch(auth(data.token));
    }
    dispatch({ type: authActionTypes.LOADING_AUTH, payload: false });
  };
};
