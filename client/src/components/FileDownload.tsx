import React, { useCallback, useEffect, useRef, useState } from 'react';
import useApi from '../hooks/api.hook';
import useStoragePage from '../hooks/storagePage.hook';
import FileLoader from './FileLoader';

interface IFileDownloader {
  id: string;
  name: string;
}

const FileDownloader: React.FC<IFileDownloader> = ({ id, name }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const api = useApi();
  // const clear = useRef<() => void>();
  const { setDownloadedFiles } = useStoragePage();

  const deleteDownloadedFile = useCallback(() => {
    setTimeout(() => {
      setDownloadedFiles((prev) => {
        let files = [...prev];
        const index = files.findIndex((downloadedFile) => {
          return downloadedFile.id === id;
        });

        files.splice(index, 1);
        return files;
      });
    }, 300);
  }, [id, setDownloadedFiles]);

  useEffect(() => {
    api?.file.downloadFile(id, name, setProgress, () => {
      deleteDownloadedFile();
      setIsVisible(false);
    });
    setIsVisible(true);
  }, []);

  const clickCloseHandler = (): void => {
    // if (!clear?.current) {
    //   console.error('error clear');
    //   return;
    // }

    // clear.current();
    deleteDownloadedFile();
    setIsVisible(false);
  };

  return (
    <FileLoader
      isVisible={isVisible}
      progress={progress}
      title={name}
      clickCloseHandler={clickCloseHandler}
    />
  );
};

export default FileDownloader;
