import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../actions/api';
import useStoragePage from '../hooks/storagePage.hook';
import { IFile } from '../Types/types';
import { FileRow } from './FileRow';

const Wrapper1 = styled.div`
  flex: 1 1;
  width: 100%;

  max-width: ${(props) => props.theme.sizes.wrapper};
  margin: 0 auto;
  overflow: hidden;
`;

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: start;

  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

interface IFilesTable {
  update: boolean;
}

export const FilesTable: React.FC<IFilesTable> = ({ update }) => {
  const [storageFiles, setStorageFiles] = useState<IFile[]>([]);
  const { currentFolder, typeSort } = useStoragePage();

  const arrayFiles = useCallback(
    (files: IFile[]) => {
      return files.map((file) => {
        return <FileRow update={update} key={file._id} {...file} />;
      });
    },
    [update]
  );

  useEffect(() => {
    (async () => {
      console.log('Storage getFiles');
      console.log('currentFolder: ', currentFolder);
      if (currentFolder) {
        const files = await api.file.getFiles(currentFolder, typeSort);
        setStorageFiles(files || []);
        console.log('Storage getFiles запрос');
      }
    })();
  }, [currentFolder, typeSort]);

  const files = arrayFiles(storageFiles);
  return (
    <Wrapper1>
      <Wrapper>{files}</Wrapper>
    </Wrapper1>
  );
};
