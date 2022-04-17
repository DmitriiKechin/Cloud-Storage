import { Dispatch } from 'redux';
import { RequestAction, requestActionTypes } from '../../Types/request';

export const setLoadingRequest = (isLoading: boolean) => {
  return (dispatch: Dispatch<RequestAction>) => {
    dispatch({ type: requestActionTypes.LOADING_REQUEST, payload: isLoading });
  };
};

export const setSuccessRequest = (isSocces: boolean) => {
  return (dispatch: Dispatch<RequestAction>) => {
    dispatch({ type: requestActionTypes.SUCCES_REQUEST, payload: isSocces });
  };
};
