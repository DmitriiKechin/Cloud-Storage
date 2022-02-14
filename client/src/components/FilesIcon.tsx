import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { Flex } from '../elements/Flex';
import useApi from '../hooks/api.hook';
import useStoragePage from '../hooks/storagePage.hook';
import { IFile } from '../Types/types';
import ControlButtons from './ControlButtons';
import { FileIcon } from './FileIcon';
import { PropertyAndValue } from './PropertyAndValue';

const Wrapper = styled.div`
  flex: 1 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;

  max-width: ${(props) => props.theme.sizes.wrapper};
  margin: 0 auto;
  overflow: hidden;
  @media ${(props) => props.theme.media.mobile} {
    flex-direction: column-reverse;
    justify-content: space-between;
  }
`;

const FilesElement = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  flex-wrap: wrap;
  align-items: flex-start;
  align-self: flex-start;
  justify-content: start;
  overflow-y: scroll;
  padding: 0.2rem;
  max-height: 100%;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const FileInfo = styled.div`
  flex: 0 0 8rem;
  width: 8rem;
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
  background-color: ${(props) => props.theme.colors.lightSecondary};
  border-radius: 0.5rem;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }

  @media ${(props) => props.theme.media.mobile} {
    flex: 0 0 5rem;
    width: 100%;
  }
`;

const FlexProperty = styled(Flex)`
  @media ${(props) => props.theme.media.mobile} {
    display: none;
  }
`;

interface IFilesIcon {
  update: boolean;
}

const FilesIcon: React.FC<IFilesIcon> = ({ update }) => {
  const [storageFiles, setStorageFiles] = useState<IFile[]>([]);

  const api = useApi();
  const {
    currentFolder,
    targetName,
    targetDate,
    targetSize,
    targetCountFiles,
    typeSort,
  } = useStoragePage();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [marginIconFile, setMarginIconFile] = useState<string>('');

  const сomputationMargin = useCallback(() => {
    if (wrapperRef.current) {
      const rem = Number.parseFloat(getComputedStyle(document.body).fontSize);
      const widthWrapper = wrapperRef.current.offsetWidth - 0.4 * rem - 0.5;
      const numberOfIconInRow = Math.floor(widthWrapper / (6.4 * rem));
      const margin =
        (widthWrapper - numberOfIconInRow * 6.4 * rem) /
        (numberOfIconInRow * 2);

      setMarginIconFile(margin + 'px');
    }
  }, []);

  const arrayFiles = useCallback(
    (files: IFile[]) => {
      return files.map((file) => {
        return (
          <FileIcon
            key={file._id}
            margin={`0.2rem calc(${marginIconFile} + 0.2rem)`}
            {...file}
          />
        );
      });
    },
    [marginIconFile]
  );

  useLayoutEffect(() => {
    сomputationMargin();
  }, [update, сomputationMargin]);

  useEffect(() => {
    (async () => {
      console.log('Storage getFiles');
      if (currentFolder) {
        console.log('currentFolder: ', currentFolder);
        const files = await api!.file.getFiles(currentFolder, typeSort);
        setStorageFiles(files || []);
      }
    })();
  }, [currentFolder, typeSort]);

  const files = arrayFiles(storageFiles);

  return (
    <Wrapper>
      <FileInfo>
        <ControlButtons parentType="icons" />

        <FlexProperty direction="column" justify="flex-start" margin="1rem 0">
          <PropertyAndValue property="Имя:" value={targetName} />
          <PropertyAndValue property="Размер:" value={targetSize} />
          <PropertyAndValue property="Файлов:" value={targetCountFiles} />
          <PropertyAndValue property="Дата создания:" value={targetDate} />
        </FlexProperty>
      </FileInfo>
      <FilesElement ref={wrapperRef}>{files}</FilesElement>
    </Wrapper>
  );
};

export default FilesIcon;
