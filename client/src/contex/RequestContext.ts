import React, { createContext } from 'react';

interface IRequest {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSuccess: boolean;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RequestContext = createContext<IRequest>({
  loading: false,
  setLoading: () => {},
  isSuccess: false,
  setIsSuccess: () => {},
});
