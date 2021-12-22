import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../elements/Button';
import { Flex } from '../elements/Flex';
import { SvgAdd } from '../elements/svg/svgAdd';
import { SvgAddFolder } from '../elements/svg/svgAddFolder';
import { SvgIcons } from '../elements/svg/svgIcons';
import { SvgList } from '../elements/svg/svgList';
import { SvgSort } from '../elements/svg/svgSort';
import { SvgUp } from '../elements/svg/svgUp';
import { CreateFolder } from './CreateFolder';

const StyledToolbar = styled.div`
  background-color: ${(props) => props.theme.colors.lightSecondary};
  height: 2.5rem;
  padding: 0.3rem 1rem;
  border-top: 0.2rem solid ${(props) => props.theme.colors.darkPrimary};
`;

const Wrapper = styled.header`
  width: 100%;
  height: 2.5rem;
  padding: 0.3rem 1rem;
  background-color: ${(props) => props.theme.colors.darkSecondary};
`;

interface IToolbar {}

export const Toolbar: React.FC<IToolbar> = () => {
  const [createFolderVisible, setCreateFolderVisible] =
    useState<boolean>(false);

  const createFolderHandler = (): void => {
    setCreateFolderVisible(!createFolderVisible);
  };
  return (
    <StyledToolbar>
      <Flex height="100%" align="center" justify="space-between">
        <Button dark click={() => {}}>
          <SvgUp />
        </Button>
        <Button dark click={createFolderHandler}>
          <SvgAddFolder />
        </Button>
        <Button dark click={() => {}}>
          <SvgAdd />
        </Button>
        <Button dark click={() => {}}>
          <SvgList />
        </Button>
        <Button dark click={() => {}}>
          <SvgSort />
        </Button>
      </Flex>
      <CreateFolder
        visible={createFolderVisible}
        closeCreateFolder={createFolderHandler}
      />
    </StyledToolbar>
  );
};
