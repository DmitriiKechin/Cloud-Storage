import { useCallback, useMemo, useState } from 'react';

import { MessageContext } from '../contex/MessageContext';

const MessageProvider: React.FC = ({ children }) => {
  const [message, setMessageValue] = useState<string>('');

  const setMessage = useCallback((text: string) => {
    if (text) {
      setMessageValue(text);
    } else {
      setTimeout(() => {
        setTimeout(() => {
          setMessageValue(text);
        }, 300);
      }, 5000);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      message,
      setMessage,
    }),
    [message, setMessage]
  );

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
