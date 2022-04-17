import React, { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import FilesIcons from './FilesIcon';
import { FilesTable } from './FilesTable';
import { UploadManager } from './UploadManager';

export const Files: React.FC = () => {
  const [update, setUpdate] = useState<boolean>(false);
  const { isTable } = useTypedSelector((state) => state.storagePage);

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
