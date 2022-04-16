import { IUser } from './types';
export const storageName: string = 'userData';

export interface AuthState {
  token: string | null;
  user: IUser | null;
  loading: boolean;
  isAuthorization: boolean;
}

export enum authActionTypes {
  LOADING_AUTH = 'LOADING_AUTH',
  LOGIN_AUTH = 'LOGIN_AUTH',
  LOGOUT_AUTH = 'LOGOUT_AUTH',
}

interface loadingAuthAction {
  type: authActionTypes.LOADING_AUTH;
  payload: boolean;
}

export interface loginAuthPayload {
  token: string;
  user: IUser;
}

interface loginAuthAction {
  type: authActionTypes.LOGIN_AUTH;
  payload: loginAuthPayload;
}

interface logoutAuthAction {
  type: authActionTypes.LOGOUT_AUTH;
}

export type AuthAction = loginAuthAction | logoutAuthAction | loadingAuthAction;
