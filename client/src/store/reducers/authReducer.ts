import { AuthAction, authActionTypes, AuthState } from '../../Types/auth';

const initialState: AuthState = {
  isAuthorization: false,
  loading: false,
  token: null,
  user: null,
};

export const authReducer = (
  state = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case authActionTypes.LOADING_AUTH:
      return { ...state, loading: action.payload };

    case authActionTypes.LOGIN_AUTH:
      return {
        user: action.payload.user,
        isAuthorization: true,
        token: action.payload.token,
        loading: false,
      };

    case authActionTypes.LOGOUT_AUTH:
      return {
        token: null,
        user: null,
        isAuthorization: false,
        loading: false,
      };

    default:
      return state;
  }
};
