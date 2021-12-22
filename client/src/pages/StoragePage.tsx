import React, { useState } from 'react';

import { Header } from '../components/Header';
import { Toolbar } from '../components/Toolbar';
import { UserMenu } from '../components/UserMenu';
import { useUserInfo } from '../hooks/userInfo.hook';

export const StoragePage: React.FC = () => {
  const [userMenuVisible, setUserMenuViseble] = useState<boolean>(false);
  const userInfo = useUserInfo();

  const userMenuHandler = (): void => {
    setUserMenuViseble(!userMenuVisible);
  };

  return (
    <>
      <Header
        userMenuHandler={userMenuHandler}
        logoSrc={'https://image.pngaaa.com/805/665805-middle.png'}
        title="Dimitrius Storage"
        userName={userInfo.userName}
        avatarSrc={userInfo.avatarSrc}
      ></Header>
      <UserMenu
        closeHandler={userMenuHandler}
        visible={userMenuVisible}
        avatarSrc={userInfo.avatarSrc}
        countFiles={userInfo.countFiles}
        diskSpace={userInfo.diskSpace}
        freeSpace={userInfo.freeSpace}
        usedSpace={userInfo.usedSpace}
        userName={userInfo.userName}
      />
      <Toolbar />
    </>
  );
};
