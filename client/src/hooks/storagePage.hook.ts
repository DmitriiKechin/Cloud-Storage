import { useContext } from 'react';
import { StoragePageContext } from '../contex/StoragePageContext';

const useStoragePage = () => {
  return useContext(StoragePageContext);
};

export default useStoragePage;
