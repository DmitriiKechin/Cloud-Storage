import React, { useContext } from 'react';
import styled from 'styled-components';
import { Flex } from '../elements/Flex';
import { PageCenter } from '../elements/PageCenter';
import { Image } from '../elements/Image';
import { Button } from '../elements/Button';
import { GlobalContext } from '../contex/GlobalContext';
import { FileLoad } from '../elements/FileLoad';
import { useHttp } from '../hooks/http.hook';
import { IDataLogin, ObjectString } from '../Types/types';
import { SvgAddImage } from '../elements/svg/svgAddImage';
import { SvgExit } from '../elements/svg/svgExit';

const Wrapper = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const UserMenuStyled = styled.div`
  width: 20rem;
  height: 19rem;
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
  visible: boolean;
  avatarSrc: string;
  userName: string;
  diskSpace: number;
  freeSpace: number;
  usedSpace: number;
  countFiles: number;
}

export const UserMenu: React.FC<IUserMenu> = ({
  visible,
  avatarSrc,
  userName,
  diskSpace,
  freeSpace,
  usedSpace,
  countFiles,
  closeHandler,
}) => {
  const { auth } = useContext(GlobalContext);
  const { loading, request, isLoadingSuccess } = useHttp();

  const logout = (): void => {
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

    const headers: ObjectString = {};
    headers['authorization'] = auth.token || 'null';

    await request('/api/files/avatar', 'POST', formData, headers);
  };

  return (
    <Wrapper visible={visible}>
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
                    load={loading}
                    validate={isLoadingSuccess}
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
              <Text>Размер диска</Text>
              <Text>{diskSpace} Гб</Text>
            </Flex>

            <Flex
              align="center"
              justify="space-between"
              margin="0 0 0.5rem"
              width="100%"
            >
              <Text>Использовано</Text>
              <Text>{usedSpace} Гб</Text>
            </Flex>

            <Flex
              align="center"
              justify="space-between"
              margin="0 0 0.5rem"
              width="100%"
            >
              <Text>Свободно</Text>
              <Text>{freeSpace} Гб</Text>
            </Flex>

            <Flex
              align="center"
              justify="space-between"
              margin="0 0 2rem"
              width="100%"
            >
              <Text>Всего файлов</Text>
              <Text>{countFiles}</Text>
            </Flex>

            <Button click={closeHandler}>Закрыть</Button>
          </Flex>
        </UserMenuStyled>
      </PageCenter>
    </Wrapper>
  );
};
