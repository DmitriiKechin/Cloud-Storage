import { useState } from 'react';

import { RequestContext } from '../contex/RequestContext';

const RequestProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  return (
    <RequestContext.Provider
      value={{ loading, setLoading, isSuccess, setIsSuccess }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export default RequestProvider;
