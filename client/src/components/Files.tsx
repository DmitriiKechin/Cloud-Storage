import React, { useState } from 'react';
import useStoragePage from '../hooks/storagePage.hook';
import FilesIcons from './FilesIcon';
import { FilesTable } from './FilesTable';
import { UploadManager } from './UploadManager';

export const Files: React.FC = () => {
  const [update, setUpdate] = useState<boolean>(false);
  const { isTable } = useStoragePage();

  window.addEventListener('resize', () => {
    if (update) {
      return;
    }

    setUpdate(true);

    setTimeout(() => {
      setUpdate(false);
    }, 16);
  });

  return (
    <>
      {isTable ? (
        <FilesTable update={update} />
      ) : (
        <FilesIcons update={update} />
      )}
      <UploadManager />
    </>
  );
};
