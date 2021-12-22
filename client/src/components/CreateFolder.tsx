import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../elements/Button';
import { ButtonClose } from '../elements/ButtonClose';
import { Flex } from '../elements/Flex';
import { Input } from '../elements/Input';
import { PageCenter } from '../elements/PageCenter';
import { useHttp } from '../hooks/http.hook';
import { IFile } from '../Types/types';

const Wrapper = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const Title = styled.h3`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.lightPrimary};
`;

const StyledCreateFolder = styled.div`
  position: relative;
  width: 20rem;
  height: 11rem;
  background-color: ${(props) => props.theme.colors.darkSecondary};
  border-radius: 2rem;
  padding: 1.5rem;
`;

interface ICreateFolder {
  visible: boolean;
  closeCreateFolder(): void;
}

export const CreateFolder: React.FC<ICreateFolder> = ({
  closeCreateFolder,
  visible,
}) => {
  const { loading, request, isLoadingSuccess } = useHttp();
  const [folderName, setFollderName] = useState<string>('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFollderName(event.target.value);
  };

  useEffect(() => {
    if (isLoadingSuccess) {
      setTimeout(() => {
        closeCreateFolder(); //нельзя включить так как функция не чиста
      }, 1000);
    }
  }, [isLoadingSuccess]);

  const createFolder = async (): Promise<void> => {
    const data: IFile = await request('/api/files', 'POST', {
      name: folderName,
      type: 'dir',
      parent: '61b5dc3270e3271c991674ff',
    });
  };

  useEffect(() => {
    setFollderName('');
  }, [visible]);

  return (
    <Wrapper visible={visible}>
      <PageCenter>
        <StyledCreateFolder>
          <ButtonClose close={closeCreateFolder} />
          <Flex direction="column" justify="space-between" height="100%">
            <Title>Введите название директории</Title>
            <Input
              changeHandler={changeHandler}
              type="text"
              labelTitle="Name"
              name="folderName"
              value={folderName}
            />

            <Flex justify="flex-end">
              <Button
                click={createFolder}
                load={loading}
                validate={isLoadingSuccess}
              >
                Ok
              </Button>
            </Flex>
          </Flex>
        </StyledCreateFolder>
      </PageCenter>
    </Wrapper>
  );
};
