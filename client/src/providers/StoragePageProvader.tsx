import { useState, useMemo } from 'react';
import { ILoadedFile, ISettingUser, typeSort } from '../Types/types';
import { StoragePageContext } from '../contex/StoragePageContext';
import { useUserInfo } from '../hooks/userInfo.hook';

const StoragePageProvider: React.FC = ({ children }) => {
  const userInfo = useUserInfo();

  let settingDefault: ISettingUser | null = null;
  const usersSettings = localStorage.getItem('usersSettings');

  if (usersSettings) {
    settingDefault = JSON.parse(usersSettings)[userInfo.id];
  }

  const [currentFolder, setCurrentFolder] = useState<string>(
    settingDefault?.currentFolder || userInfo.id
  );

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

  const [typeSort, setTypeSort] = useState<typeSort>(
    settingDefault?.typeSort || 'Name'
  );
  const [isTable, setIsTable] = useState<boolean>(
    settingDefault?.isTable || false
  );

  const [uploadedFiles, setUploadedFiles] = useState<ILoadedFile[]>([]);

  const openFolderHandler = (id: string): void => {
    setCurrentFolder(id);
  };

  const contextValue = useMemo(
    () => ({
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
      uploadedFiles,
      setUploadedFiles,
    }),
    [
      currentFolder,
      isTable,
      parentFolder,
      target,
      targetCountFiles,
      targetDate,
      targetName,
      targetSize,
      targetType,
      typeSort,
      uploadedFiles,
    ]
  );
  return (
    <StoragePageContext.Provider value={contextValue}>
      {children}
    </StoragePageContext.Provider>
  );
};

export default StoragePageProvider;
