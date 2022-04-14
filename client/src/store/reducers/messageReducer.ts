import {
  MessageAction,
  messageActionTypes,
  MessageState,
} from '../../Types/message';

const initialState: MessageState = {
  message: '',
};

export const messageReducer = (
  state = initialState,
  action: MessageAction
): MessageState => {
  switch (action.type) {
    case messageActionTypes.SET_MESSAGE:
      return { message: action.payload };
    default:
      return state;
  }
};
