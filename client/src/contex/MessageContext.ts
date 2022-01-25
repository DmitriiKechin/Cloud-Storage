import { createContext } from 'react';

interface IMessage {
  message: string;
  setMessage(text: string): void;
}

export const MessageContext = createContext<IMessage>({
  message: '',
  setMessage: () => {},
});
