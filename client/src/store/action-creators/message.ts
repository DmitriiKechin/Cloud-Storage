import { Dispatch } from 'redux';
import { MessageAction, messageActionTypes } from '../../Types/message';

export const setMessage = (message: string) => {
  return (dispatch: Dispatch<MessageAction>) => {
    if (!message) {
      return;
    }

    dispatch({ type: messageActionTypes.SET_MESSAGE, payload: message });

    setTimeout(() => {
      setTimeout(() => {
        dispatch({ type: messageActionTypes.SET_MESSAGE, payload: '' });
      }, 300);
    }, 5000);
  };
};
