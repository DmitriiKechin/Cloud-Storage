import { useContext } from 'react';
import { MessageContext } from '../contex/MessageContext';

const useMessage = () => {
  return useContext(MessageContext);
};

export default useMessage;
