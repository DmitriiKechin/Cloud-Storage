import {
  RequestAction,
  requestActionTypes,
  RequestState,
} from '../../Types/request';

const initialState: RequestState = {
  isSuccessRequest: false,
  loadingRequest: false,
};

export const requestReducer = (
  state = initialState,
  action: RequestAction
): RequestState => {
  switch (action.type) {
    case requestActionTypes.LOADING_REQUEST:
      return { ...state, loadingRequest: action.payload };

    case requestActionTypes.SUCCES_REQUEST:
      return { ...state, isSuccessRequest: action.payload };

    default:
      return state;
  }
};
