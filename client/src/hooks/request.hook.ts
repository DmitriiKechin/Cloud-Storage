import { useContext } from 'react';
import { RequestContext } from '../contex/RequestContext';

const useRequest = () => {
  return useContext(RequestContext);
};

export default useRequest;
