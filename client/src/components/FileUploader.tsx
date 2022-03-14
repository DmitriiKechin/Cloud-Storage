import React, { useCallback, useEffect, useRef, useState } from 'react';
import useApi from '../hooks/api.hook';
import useStoragePage from '../hooks/storagePage.hook';
import { ILoadedFile } from '../Types/types';
import FileLoader from './FileLoader';

interface IFileUploader {
  file: ILoadedFile;
}

const FileUploader: React.FC<IFileUploader> = ({ file }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const api = useApi();
  const clear = useRef<() => void>();
  const { currentFolder, setUploadedFiles } = useStoragePage();

  const deleteUploadedFile = useCallback(() => {
    setTimeout(() => {
      setUploadedFiles((prev) => {
        let files = [...prev];
        const index = files.findIndex((uploadedFile) => {
          return (
            uploadedFile.name === file.name &&
            uploadedFile.size === file.size &&
            uploadedFile.lastModified === file.lastModified
          );
        });

        files.splice(index, 1);
        return files;
      });
    }, 300);
  }, [file.lastModified, file.name, file.size, setUploadedFiles]);

  useEffect(() => {
    (async () => {
      const formData = new FormData();
      console.log('file', file);
      formData.append('file', file);
      formData.append('parent', currentFolder);

      clear.current = await api!.file.uploadFile(formData, setProgress, () => {
        deleteUploadedFile();
        setIsVisible(false);
      });

      setIsVisible(true);
    })();
  }, []);

  const clickCloseHandler = (): void => {
    if (!clear?.current) {
      console.error('error clear');
      return;
    }

    clear.current();
    deleteUploadedFile();
    setIsVisible(false);
  };

  return (
    <FileLoader
      isVisible={isVisible}
      progress={progress}
      title={file.name}
      clickCloseHandler={clickCloseHandler}
    />
  );
};

export default FileUploader;
