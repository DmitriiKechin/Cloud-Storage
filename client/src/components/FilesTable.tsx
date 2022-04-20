import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useApi } from '../hooks/useApi';
import { useTypedSelector } from '../hooks/useTypedSelector';
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
  const { currentFolder, typeSort, updateFiles } = useTypedSelector(
    (state) => state.storagePage
  );
  const api = useApi();

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
      console.log('filesTable');
      if (currentFolder) {
        const files = await api.file.getFiles(currentFolder, typeSort);
        setStorageFiles(files || []);
      }
    })();
  }, [currentFolder, typeSort, updateFiles]);

  const files = arrayFiles(storageFiles);
  return (
    <Wrapper1>
      <Wrapper>{files}</Wrapper>
    </Wrapper1>
  );
};
