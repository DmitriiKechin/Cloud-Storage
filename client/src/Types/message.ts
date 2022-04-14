export interface MessageState {
  message: string;
}

export enum messageActionTypes {
  SET_MESSAGE = 'SET_MESSAGE',
}

interface setMessageAction {
  type: messageActionTypes;
  payload: string;
}

export type MessageAction = setMessageAction;
