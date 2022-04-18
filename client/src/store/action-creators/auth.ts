import { Dispatch } from 'redux';
import {
  AuthAction,
  authActionTypes,
  loginAuthPayload,
  storageName,
} from '../../Types/auth';

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

export const loading = (payload: boolean) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: authActionTypes.LOADING_AUTH, payload });
  };
};
