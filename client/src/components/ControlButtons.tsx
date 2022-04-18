import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from '../elements/Button';
import { SvgDelete } from '../elements/svg/svgDelete';
import { SvgDownload } from '../elements/svg/svgDownload';
import { SvgEdit } from '../elements/svg/svgEdit';
import { SvgOpenFolder } from '../elements/svg/svgOpenFolder';
import { SvgShare } from '../elements/svg/svgShare';
import { useAction } from '../hooks/useAction';
import { Prompt } from './Prompt';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useApi } from '../hooks/useApi';

type parentType = 'table' | 'icons';

interface IControlButtons {
  parentType: parentType;
}

const Wrapper = styled.div<{ parentType: parentType }>`
  ${(props) =>
    props.parentType === 'icons' &&
    css`
      flex: 0 0 10rem;
      display: flex;
      width: 100%;
      height: 10rem;
      flex-direction: column;
      align-content: center;
      justify-content: space-between;
      margin: 0.2rem 0;
      @media ${(props) => props.theme.media.mobile} {
				flex 1 1 100%;
        flex-direction: row;
        flex-wrap: wrap;
        height: 100%;
        width: 100%;
      }
    `}

  ${(props) =>
    props.parentType === 'table' &&
    css`
      display: flex;
      width: 100%;
      height: 100%;
      align-content: center;
      justify-content: space-between;
    `}
`;

const FilesButtons = styled(Button)<{ parentType: parentType }>`
  ${(props) =>
    props.parentType === 'icons' &&
    css`
      @media ${(props) => props.theme.media.mobile} {
        width: 47%;
        margin: 1%;
      }
    `}

  ${(props) =>
    props.parentType === 'table' &&
    css`
      height: 100%;
    `}
`;

const ControlButtons: React.FC<IControlButtons> = ({ parentType }) => {
  const { setMessage } = useAction();
  const [renamePromptVisible, setRenamePromptVisible] =
    useState<boolean>(false);
  const {
    setCurrentFolder,
    setParentFolder,
    setTargetCountFiles,
    setTargetDate,
    setTargetName,
    setTargetSize,
  } = useAction();
  const api = useApi();
  const { targetType, target, targetName, currentFolder, parentFolder } =
    useTypedSelector((state) => state.storagePage);

  const renameHandler = (): void => {
    setRenamePromptVisible(!renamePromptVisible);
  };

  const renameFile = async (newName: string): Promise<void> => {
    const name = newName.trim();
    await api.file.renameFile(name, target.id);
    // setCurrentFolder('');
    setCurrentFolder(currentFolder);
  };

  return (
    <Wrapper parentType={parentType}>
      {targetType !== 'dir' ? (
        <FilesButtons
          parentType={parentType}
          dark
          click={() => {
            api.file.downloadFile(target.id, targetName);
          }}
        >
          <SvgDownload />
        </FilesButtons>
      ) : (
        <FilesButtons
          parentType={parentType}
          dark
          click={() => {
            setCurrentFolder(target.id);
            setParentFolder([...parentFolder, target.parent]);
            setTargetCountFiles(' шт.');
            setTargetDate('');
            setTargetName('');
            setTargetSize(' Mb');
          }}
        >
          <SvgOpenFolder />
        </FilesButtons>
      )}
      <FilesButtons parentType={parentType} dark click={renameHandler}>
        <SvgEdit />
      </FilesButtons>

      <FilesButtons
        parentType={parentType}
        dark
        click={async () => {
          const link = await api.file.shareFile(target.id);
          navigator.clipboard.writeText(link).then(() => {
            setMessage('link copied');
          });
        }}
      >
        <SvgShare />
      </FilesButtons>

      <FilesButtons
        parentType={parentType}
        dark
        click={async () => {
          await api.file.deleteFile(target.id);
          // setCurrentFolder('');
          setCurrentFolder(currentFolder);
        }}
      >
        <SvgDelete />
      </FilesButtons>

      {renamePromptVisible && (
        <Prompt
          visible={renamePromptVisible}
          closePrompt={renameHandler}
          title="Введите название директории"
          promptHandler={renameFile}
          valueDefault={targetName}
        />
      )}
    </Wrapper>
  );
};

export default ControlButtons;
