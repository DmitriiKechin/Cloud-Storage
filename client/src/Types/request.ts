export interface RequestState {
  loadingRequest: boolean;
  isSuccessRequest: boolean;
}

export enum requestActionTypes {
  LOADING_REQUEST = 'LOADING_REQUEST',
  SUCCES_REQUEST = 'SUCCES_REQUEST',
}

interface loadingRequstAction {
  type: requestActionTypes.LOADING_REQUEST;
  payload: boolean;
}

interface succesRequestActions {
  type: requestActionTypes.SUCCES_REQUEST;
  payload: boolean;
}

export type RequestAction = loadingRequstAction | succesRequestActions;
