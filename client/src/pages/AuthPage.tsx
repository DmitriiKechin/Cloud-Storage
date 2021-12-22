import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { TitleLogo } from '../components/TitleLogo';
import { GlobalContext } from '../contex/GlobalContext';

import { Button } from '../elements/Button';
import { Flex } from '../elements/Flex';
import { Input } from '../elements/Input';
import { PageCenter } from '../elements/PageCenter';
import { useHttp } from '../hooks/http.hook';
import logo from '../img/logo.svg';
import { IDataLogin } from '../Types/types';

const StyledAuthPage = styled.form`
  width: 22rem;
  height: 22rem;
  padding: 2rem;
  border-radius: 2rem;
  border: 0.1rem solid ${(props) => props.theme.colors.darkPrimary};
  background-color: ${(props) => props.theme.colors.darkSecondary};
  box-shadow: 0 0 0.5rem ${(props) => props.theme.colors.darkPrimary};
`;

export const AuthPage: React.FC = () => {
  const { loading, request } = useHttp();

  const { auth } = useContext(GlobalContext);
  const [formDate, setFormDate] = useState<{ email: string; password: string }>(
    {
      email: '',
      password: '',
    }
  );

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormDate({ ...formDate, [event.target.name]: event.target.value });
  };

  const registerHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const data = await request('/api/auth/registration', 'POST', {
      ...formDate,
    });
    auth.login(data);
  };

  const loginHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const data: IDataLogin = await request('/api/auth/login', 'POST', {
      ...formDate,
    });
    auth.login(data);
  };

  return (
    <PageCenter>
      <StyledAuthPage>
        <Flex parentHeight direction={'column'} justify="space-between">
          <TitleLogo src={String(logo)} />
          <Input
            type={'email'}
            value={formDate.email}
            changeHandler={changeHandler}
            labelTitle={'Login'}
            name={'email'}
            required={true}
          />
          <Input
            type={'password'}
            name={'password'}
            value={formDate.password}
            changeHandler={changeHandler}
            labelTitle={'Password'}
            required={true}
          />
          <Flex justify={'space-between'}>
            <Button click={registerHandler} load={loading} validate={false}>
              Registration
            </Button>
            <Button click={loginHandler} load={loading} validate={false}>
              Log In
            </Button>
          </Flex>
        </Flex>
      </StyledAuthPage>
    </PageCenter>
  );
};
