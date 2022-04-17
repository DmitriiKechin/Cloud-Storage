import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Files } from '../components/Files';
import Frame from '../components/Frame';
import { Header } from '../components/Header';
import { Toolbar } from '../components/Toolbar';
import { UserMenu } from '../components/UserMenu';
import { useAction } from '../hooks/useAction';
import { useUserInfo } from '../hooks/userInfo.hook';
import { ISettingUser } from '../Types/types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  justify-content: flex-start;
  border-bottom: 0.2rem solid ${(props) => props.theme.colors.darkPrimary};
`;

export const StoragePage: React.FC = () => {
  const [userMenuVisible, setUserMenuViseble] = useState<boolean>(false);
  const userInfo = useUserInfo();
  const {
    setIsTable,
    setParentFolder,
    setCurrentFolder,
    setTarget,
    setTargetCountFiles,
    setTypeSort,
    setTargetSize,
  } = useAction();

  const userMenuHandler = (): void => {
    setUserMenuViseble(!userMenuVisible);
  };

  useEffect(() => {
    let settingDefault: ISettingUser | null = null;
    const usersSettings = localStorage.getItem('usersSettings');

    if (usersSettings) {
      settingDefault = JSON.parse(usersSettings)[userInfo.id];
    }
    setCurrentFolder(settingDefault?.currentFolder || userInfo.id);
    setIsTable(settingDefault?.isTable || false);
    setParentFolder([userInfo.id]);
    setTarget({
      id: userInfo.id,
      parent: userInfo.id,
    });
    setTargetCountFiles(userInfo.countFiles + ' шт.');
    setTypeSort(settingDefault?.typeSort || 'Name');
    setTargetSize(userInfo.usedSpace);
  }, []);

  return (
    <Wrapper>
      <Header
        userMenuHandler={userMenuHandler}
        title="Dimitrius Storage"
        userName={userInfo.userName}
        avatarSrc={userInfo.avatarSrc}
      ></Header>
      {userMenuVisible && (
        <UserMenu
          closeHandler={userMenuHandler}
          avatarSrc={userInfo.avatarSrc}
          countFiles={userInfo.countFiles}
          countFolders={userInfo.countFolders}
          diskSpace={userInfo.diskSpace}
          freeSpace={userInfo.freeSpace}
          usedSpace={userInfo.usedSpace}
          userName={userInfo.userName}
        />
      )}
      <Toolbar />
      <Files />
      <Frame />
    </Wrapper>
  );
};
