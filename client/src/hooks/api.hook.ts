import { useContext } from 'react';
import { APIContext } from '../contex/ApiContext';

const useApi = () => {
  return useContext(APIContext);
};

export default useApi;
