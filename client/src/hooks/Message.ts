import { useCallback, useContext } from 'react';
import { GlobalContext } from '../contex/GlobalContext';

export const useMessage = () => {
  const {
    modal: { setMessage, setIsText },
  } = useContext(GlobalContext);
  return useCallback(
    (text: string) => {
      if (text) {
        setIsText(true);
        setMessage(text);
      } else {
        setTimeout(() => {
          setIsText(false);
          setTimeout(() => {
            setMessage(text);
          }, 300);
        }, 5000);
      }
    },
    [setIsText, setMessage]
  );
};
