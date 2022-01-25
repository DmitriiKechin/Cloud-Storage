import { useState } from 'react';
import { typeSort } from '../Types/types';
import { StoragePageContext } from '../contex/StoragePageContext';
import { useUserInfo } from '../hooks/userInfo.hook';

const StoragePageProvider: React.FC = ({ children }) => {
  const userInfo = useUserInfo();
  const [currentFolder, setCurrentFolder] = useState<string>(userInfo.id);
  const [parentFolder, setParentFolder] = useState<string[]>([userInfo.id]);

  const [target, setTarget] = useState<{ id: string; parent: string }>({
    id: userInfo.id,
    parent: userInfo.id,
  });
  const [targetSize, setTargetSize] = useState<string>(userInfo.usedSpace);
  const [targetCountFiles, setTargetCountFiles] = useState<string>(
    userInfo.countFiles + ' шт.'
  );
  const [targetDate, setTargetDate] = useState<string>('');
  const [targetType, setTargetType] = useState<string>('');
  const [targetName, setTargetName] = useState<string>('Всего');

  const [typeSort, setTypeSort] = useState<typeSort>('Name');
  const [isTable, setIsTable] = useState<boolean>(false);

  const openFolderHandler = (id: string): void => {
    setCurrentFolder(id);
  };

  return (
    <StoragePageContext.Provider
      value={{
        parentFolder,
        setParentFolder,
        currentFolder,
        openFolderHandler,
        target,
        setTarget,
        setTargetCountFiles,
        setTargetDate,
        setTargetSize,
        targetCountFiles,
        targetDate,
        targetSize,
        setTargetType,
        targetType,
        targetName,
        setTargetName,
        setTypeSort,
        typeSort,
        isTable,
        setIsTable,
      }}
    >
      {children}
    </StoragePageContext.Provider>
  );
};

export default StoragePageProvider;
