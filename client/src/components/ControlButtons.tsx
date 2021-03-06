import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from '../elements/Button';
import { SvgDelete } from '../elements/svg/svgDelete';
import { SvgDownload } from '../elements/svg/svgDownload';
import { SvgEdit } from '../elements/svg/svgEdit';
import { SvgOpenFolder } from '../elements/svg/svgOpenFolder';
import { SvgShare } from '../elements/svg/svgShare';
import useApi from '../hooks/api.hook';
import useMessage from '../hooks/message.hook';
import useStoragePage from '../hooks/storagePage.hook';
import { Prompt } from './Prompt';

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
      /* margin: 0.2rem 0; */
      /* @media ${(props) => props.theme.media.mobile} {
        flex-direction: row;
        flex-wrap: wrap;
        height: 100%;
        width: 100%;
      } */
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
      /* @media ${(props) => props.theme.media.mobile} {
        width: 47%;
        margin: 1%;
      } */
    `}
`;

const ControlButtons: React.FC<IControlButtons> = ({ parentType }) => {
  const { setMessage } = useMessage();
  const [renamePromptVisible, setRenamePromptVisible] =
    useState<boolean>(false);
  const {
    targetType,
    target,
    targetName,
    currentFolder,
    openFolderHandler,
    setParentFolder,
    setTargetCountFiles,
    setTargetDate,
    setTargetName,
    setTargetSize,
  } = useStoragePage();
  const api = useApi();

  const renameHandler = (): void => {
    setRenamePromptVisible(!renamePromptVisible);
  };

  const renameFile = async (newName: string): Promise<void> => {
    const name = newName.trim();
    await api!.file.renameFile(name, target.id);
    openFolderHandler('');
    openFolderHandler(currentFolder);
  };

  return (
    <Wrapper parentType={parentType}>
      {targetType !== 'dir' ? (
        <FilesButtons
          parentType={parentType}
          dark
          click={() => {
            api!.file.downloadFile(target.id, targetName);
          }}
        >
          <SvgDownload />
        </FilesButtons>
      ) : (
        <FilesButtons
          parentType={parentType}
          dark
          click={() => {
            openFolderHandler(target.id);
            setParentFolder((prev) => [...prev, target.parent]);
            setTargetCountFiles(' ????.');
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
          const link = await api!.file.shareFile(target.id);
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
          await api!.file.deleteFile(target.id);
          openFolderHandler('');
          openFolderHandler(currentFolder);
        }}
      >
        <SvgDelete />
      </FilesButtons>

      {renamePromptVisible && (
        <Prompt
          visible={renamePromptVisible}
          closePrompt={renameHandler}
          title="?????????????? ???????????????? ????????????????????"
          promptHandler={renameFile}
          valueDefault={targetName}
        />
      )}
    </Wrapper>
  );
};

export default ControlButtons;
