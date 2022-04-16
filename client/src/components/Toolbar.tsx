import React, { useState } from 'react';
import styled from 'styled-components';
import { setSettingUser } from '../actions/settingUser';
import { Button } from '../elements/Button';
import { FileLoad } from '../elements/FileLoad';
import { SvgAdd } from '../elements/svg/svgAdd';
import { SvgAddFolder } from '../elements/svg/svgAddFolder';
import { SvgIcons } from '../elements/svg/svgIcons';
import { SvgList } from '../elements/svg/svgList';
import { SvgUp } from '../elements/svg/svgUp';
import adaptiveSize from '../global_Function/adaptiveSize';
import useApi from '../hooks/api.hook';
import useStoragePage from '../hooks/storagePage.hook';
import { Prompt } from './Prompt';
import { Sort } from './Sort';

const StyledToolbar = styled.div`
  flex: 0 0 2.9rem;
  height: 2.9rem;

  background-color: ${(props) => props.theme.colors.lightSecondary};
  padding: 0 1rem;
  border-top: 0.2rem solid ${(props) => props.theme.colors.darkPrimary};
  border-bottom: 0.2rem solid ${(props) => props.theme.colors.darkPrimary};

  @media (max-width: 450px) {
    flex: 0 0 5.8rem;
    height: 5.8rem;
  }
`;

const Wrapper = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: ${(props) => props.theme.sizes.wrapper};
  margin: auto;

  @media (max-width: 450px) {
    flex-wrap: wrap;
  }
`;

const GroupButtonsSecondary = styled.div`
  width: 100%;
  padding: 0.3rem 0;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 450px) {
    height: auto;
  }
`;

const GroupButtonsPrimery = styled(GroupButtonsSecondary)`
  margin-right: ${adaptiveSize({
    maxSize: '100px',
    minSize: '15px',
    minWidth: '450px',
    maxWidth: '1100px',
  })};

  @media (max-width: 450px) {
    margin-right: 0;
    border-bottom: 0.12rem solid ${(props) => props.theme.colors.darkPrimary};
  }

  @media ${(props) => props.theme.media.desktop} {
    margin-right: 100px;
  }
`;

interface IToolbar {}

export const Toolbar: React.FC<IToolbar> = () => {
  const [createFolderPromptVisible, setCreateFolderPromptVisible] =
    useState<boolean>(false);

  const api = useApi();
  const {
    openFolderHandler,
    parentFolder,
    currentFolder,
    setParentFolder,
    isTable,
    setIsTable,
    setUploadedFiles,
    uploadedFiles,
  } = useStoragePage();

  const createFolderHandler = (): void => {
    setCreateFolderPromptVisible(!createFolderPromptVisible);
  };

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) {
      return;
    }

    let files = [...uploadedFiles];

    [...event.target.files].forEach((file) => {
      if (!files.filter((item) => item.name === file.name).length) {
        files.push(file);
      }
    });

    setUploadedFiles(files);

    files = [];
  };

  const createFolder = async (nameFolder: string): Promise<void> => {
    await api!.file.createDir({
      name: nameFolder.trim(),
      type: 'dir',
      parent: currentFolder,
    });

    openFolderHandler('');
    openFolderHandler(currentFolder);
  };

  return (
    <StyledToolbar>
      <Wrapper>
        <GroupButtonsPrimery>
          <Button
            dark
            width="3rem"
            padding="0.1rem"
            click={() => {
              openFolderHandler(parentFolder[parentFolder.length - 1]);
              if (parentFolder.length > 1) {
                const newParentFolder = [
                  ...parentFolder.splice(0, parentFolder.length - 1),
                ];
                setParentFolder(newParentFolder);
              }
            }}
          >
            <SvgUp />
          </Button>
          <Button
            dark
            width="3rem"
            padding="0.1rem"
            click={createFolderHandler}
          >
            <SvgAddFolder />
          </Button>
          <FileLoad
            dark
            width="3rem"
            padding="0.1rem"
            changeHandler={async (event) => {
              uploadFile(event);
            }}
          >
            <SvgAdd />
          </FileLoad>
        </GroupButtonsPrimery>

        <GroupButtonsSecondary>
          <Button
            dark
            width="3rem"
            padding="0.1rem"
            click={() => {
              setSettingUser({ isTable: !isTable });
              setIsTable((prev) => !prev);
            }}
          >
            {isTable ? <SvgIcons /> : <SvgList />}
          </Button>

          <Sort />
        </GroupButtonsSecondary>
      </Wrapper>

      {createFolderPromptVisible && (
        <Prompt
          visible={createFolderPromptVisible}
          closePrompt={createFolderHandler}
          title="Введите название директории"
          promptHandler={createFolder}
        />
      )}
    </StyledToolbar>
  );
};
