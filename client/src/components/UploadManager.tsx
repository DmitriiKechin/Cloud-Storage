import React, { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import useStoragePage from '../hooks/storagePage.hook';
import FileDownloader from './FileDownload';
import FileLoader from './FileUploader';

const Wrapper = styled.div<{ visible: boolean }>`
  width: 15rem;
  height: 20rem;

  border-radius: 2rem 0 0 2rem;
  padding: 1rem;

  position: fixed;
  right: 0;
  bottom: 0;

  background-color: ${(props) => props.theme.colors.darkSecondary};
  box-shadow: -0.5rem 0 0.5rem rgba(0, 0, 0, 0.35),
    0 -0.5rem 0.5rem rgba(0, 0, 0, 0.35);

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }

  transition: width 0.3s, padding 0.15s, height 0.3s;

  ${(props) =>
    !props.visible &&
    css`
      display: none;
      width: 0;
      padding: 0;
    `}

  @media ${(props) => props.theme.media.mobile} {
    width: 100%;
    height: 11rem;
    padding: 0.5rem;
    border-radius: 1rem 1rem 0 0;

    box-shadow: 0 -0.5rem 0.5rem rgba(0, 0, 0, 0.35);

    ${(props) =>
      !props.visible &&
      css`
        width: 100%;
        height: 0;
        padding: 0;
      `}
  }

  @media ${(props) => props.theme.media.desktop} {
    right: calc((100vw - 1100px - 0.5rem) / 2);
  }
`;

interface IUploadManager {}

export const UploadManager: React.FC<IUploadManager> = () => {
  const {
    downloadedFiles,
    setDownloadedFiles,
    uploadedFiles,
    setUploadedFiles,
    openFolderHandler,
    currentFolder,
  } = useStoragePage();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (uploadedFiles.length === 0 && downloadedFiles.length === 0) {
      setIsVisible(false);
      openFolderHandler('');
      setTimeout(() => {
        openFolderHandler(currentFolder);
      }, 0);
    } else {
      setIsVisible(true);
    }
  }, [
    setUploadedFiles,
    uploadedFiles.length,
    setDownloadedFiles,
    downloadedFiles.length,
  ]); //иначе много перевызовов

  const getFiles = useMemo(() => {
    const uploaded = uploadedFiles.map((file) => {
      const key = file.name + '%_%' + file.size;
      return <FileLoader key={key} file={file} />;
    });

    const downloaded = downloadedFiles.map((file) => {
      return <FileDownloader key={file.id} id={file.id} name={file.name} />;
    });

    return [...uploaded, ...downloaded];
  }, [uploadedFiles, downloadedFiles]);

  return <Wrapper visible={isVisible}>{getFiles}</Wrapper>;
};
