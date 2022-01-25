import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../elements/Button';
import { ButtonClose } from '../elements/ButtonClose';
import { Flex } from '../elements/Flex';
import { Input } from '../elements/Input';
import { PageCenter } from '../elements/PageCenter';
import useRequest from '../hooks/request.hook';

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

interface IPrompt {
  title: string;
  valueDefault?: string;
  visible: boolean;
  closePrompt(): void;
  promptHandler(value: string): Promise<void>;
}

export const Prompt: React.FC<IPrompt> = ({
  visible,
  closePrompt,
  title,
  valueDefault,
  promptHandler,
}) => {
  const { loading, isSuccess } = useRequest();
  const [value, setValue] = useState<string>(valueDefault || '');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        closePrompt(); //нельзя включить так как функция не чиста
      }, 1000);
    }
  }, [isSuccess]);

  useEffect(() => {
    setValue(valueDefault || '');
  }, [valueDefault, visible]);

  return (
    <Wrapper visible={visible}>
      <PageCenter>
        <StyledCreateFolder>
          <ButtonClose close={closePrompt} />
          <Flex direction="column" justify="space-between" height="100%">
            <Title>{title}</Title>
            <Input
              changeHandler={changeHandler}
              type="text"
              labelTitle="Name"
              name="folderName"
              value={value}
            />

            <Flex justify="flex-end">
              <Button
                click={() => {
                  promptHandler(value);
                }}
                load={loading}
                validate={isSuccess}
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
