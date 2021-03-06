import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from '../elements/Button';
import { Flex } from '../elements/Flex';
import { SvgClose } from '../elements/svg/svgClose';
import nameShort from '../global_Function/nameShort';
import useApi from '../hooks/api.hook';
import useStoragePage from '../hooks/storagePage.hook';
import { ILoadedFile } from '../Types/types';
import { Progressbar } from './Progressbar';

const Wrapper = styled.div<{ visible: boolean }>`
  width: 100%;
  height: 3rem;

  position: relative;
  left: 0;

  transition: left 0.3s;

  ${(props) =>
    !props.visible &&
    css`
      left: 110%;
    `}
`;

const Title = styled.div`
  width: 100%;
  position: relative;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.lightPrimary};
`;

interface IFileLoader {
  file: ILoadedFile;
}

const FileLoader: React.FC<IFileLoader> = ({ file }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const shortNameRef = useRef<string>();
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
    const formData = new FormData();
    console.log('file', file);
    formData.append('file', file);
    formData.append('parent', currentFolder);

    clear.current = api!.file.uploadFile(formData, setProgress, () => {
      deleteUploadedFile();
      setIsVisible(false);
    });

    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      const titleWidth = titleRef.current.clientWidth;
      const rem = Number.parseFloat(getComputedStyle(document.body).fontSize);
      shortNameRef.current = nameShort(
        file.name,
        1,
        (25 * titleWidth * 25) / rem / 300
      );
    }
  }, [file.name, titleRef?.current?.clientWidth]);

  return (
    <Wrapper visible={isVisible}>
      <Flex align="center" justify="space-between" margin="0 0 0.5rem 0">
        <Title ref={titleRef}>{shortNameRef.current}</Title>
        <Button
          height="1.1rem"
          width="1.1rem"
          padding="0"
          click={() => {
            if (!clear?.current) {
              console.error('error clear');
              return;
            }

            clear.current();
            deleteUploadedFile();
            setIsVisible(false);
          }}
        >
          <SvgClose />
        </Button>
      </Flex>
      <Progressbar progress={progress} />
    </Wrapper>
  );
};

export default FileLoader;
