import React from 'react';
import styled from 'styled-components';
import { Flex } from '../elements/Flex';
import { PageCenter } from '../elements/PageCenter';
import { Image } from '../elements/Image';
import { Button } from '../elements/Button';
import { FileLoad } from '../elements/FileLoad';
import { SvgAddImage } from '../elements/svg/svgAddImage';
import { SvgExit } from '../elements/svg/svgExit';
import useAuth from '../hooks/auth.hook';
import useRequest from '../hooks/request.hook';
import useApi from '../hooks/api.hook';

// const Wrapper = styled.div<{ visible: boolean }>`
//   display: ${(props) => (props.visible ? 'block' : 'none')};
// `;

const UserMenuStyled = styled.div`
  width: 20rem;
  height: 20.5rem;
  border-radius: 2rem;
  padding: 1rem;
  border: 0.1rem solid ${(props) => props.theme.colors.darkPrimary};
  background-color: ${(props) => props.theme.colors.darkSecondary};
  box-shadow: 0 0 0.5rem ${(props) => props.theme.colors.darkPrimary};
`;

const Text = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.lightPrimary};
`;

const TextTitle = styled.span`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.lightPrimary};
`;

interface IUserMenu {
  closeHandler: { (): void };
  avatarSrc: string;
  userName: string;
  diskSpace: string;
  freeSpace: string;
  usedSpace: string;
  countFiles: number;
  countFolders: number;
}

export const UserMenu: React.FC<IUserMenu> = ({
  avatarSrc,
  userName,
  diskSpace,
  freeSpace,
  usedSpace,
  countFiles,
  countFolders,
  closeHandler,
}) => {
  const auth = useAuth();
  const api = useApi();
  const { loading, isSuccess } = useRequest();

  const logout = (): void => {
    auth.setSettingUser({ currentFolder: auth?.user?._id || '' });
    auth.logout();
  };

  const uploadAvatar = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (!event.target.files) {
      return;
    }

    const file: Blob = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    await api!.file.upLoadAvatar(formData);
  };

  return (
    // <Wrapper visible={visible}>
    <PageCenter>
      <UserMenuStyled>
        <Flex parentHeight direction="column" align="center">
          <Flex
            width="100%"
            height="4.5rem"
            align="center"
            justify="space-between"
            margin="0 0 1rem"
          >
            <Image circle width="4.5rem" height="4.5rem" src={avatarSrc} />

            <Flex
              direction="column"
              align="center"
              justify="space-between"
              width="70%"
              height="100%"
            >
              <TextTitle>{userName}</TextTitle>
              <Flex align="center" justify="space-around" width="100%">
                <FileLoad
                  padding="0.1rem"
                  width="3rem"
                  load={loading}
                  validate={isSuccess}
                  changeHandler={uploadAvatar}
                >
                  <SvgAddImage />
                </FileLoad>
                <Button click={logout} width="2rem" padding="0.3rem" dark>
                  <SvgExit />
                </Button>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            align="center"
            justify="space-between"
            margin="0 0 0.5rem"
            width="100%"
          >
            <Text>???????????? ??????????</Text>
            <Text>{diskSpace}</Text>
          </Flex>

          <Flex
            align="center"
            justify="space-between"
            margin="0 0 0.5rem"
            width="100%"
          >
            <Text>????????????????????????</Text>
            <Text>{usedSpace}</Text>
          </Flex>

          <Flex
            align="center"
            justify="space-between"
            margin="0 0 0.5rem"
            width="100%"
          >
            <Text>????????????????</Text>
            <Text>{freeSpace}</Text>
          </Flex>

          <Flex
            align="center"
            justify="space-between"
            margin="0 0 0.5rem"
            width="100%"
          >
            <Text>?????????? ????????????</Text>
            <Text>{countFiles}</Text>
          </Flex>

          <Flex
            align="center"
            justify="space-between"
            margin="0 0 2rem"
            width="100%"
          >
            <Text>?????????? ??????????</Text>
            <Text>{countFolders}</Text>
          </Flex>

          <Button click={closeHandler}>??????????????</Button>
        </Flex>
      </UserMenuStyled>
    </PageCenter>
    // </Wrapper>
  );
};
