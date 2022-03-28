import React, { useState } from 'react';
import styled from 'styled-components';
import { TitleLogo } from '../components/TitleLogo';
import { Button } from '../elements/Button';
import { Flex } from '../elements/Flex';
import { Input } from '../elements/Input';
import { PageCenter } from '../elements/PageCenter';
import useApi from '../hooks/api.hook';
import logo from '../img/logo.svg';
import { IDataLogin } from '../Types/types';
import useAuth from '../hooks/auth.hook';
import useRequest from '../hooks/request.hook';

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
  const api = useApi();
  const auth = useAuth();
  const { loading, isSuccess } = useRequest();

  const [formDate, setFormDate] = useState<{ email: string; password: string }>(
    {
      email: '',
      password: '',
    }
  );

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormDate({ ...formDate, [event.target.name]: event.target.value });
  };

  // const registerHandler = async (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();

  //   const data: IDataLogin = await api!.auth.registration({
  //     ...formDate,
  //   });
  //   setTimeout(() => {
  //     data && auth.login(data.token, data.user, auth.isAuthorization);
  //   }, 1500);
  // };

  const testValuesOfLogin = (event: React.MouseEvent): void => {
    event.preventDefault();
    setFormDate({
      email: 'demo@demo.ru',
      password: 'demo',
    });
  };

  const loginHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const data: IDataLogin = await api!.auth.login({ ...formDate });
    setTimeout(() => {
      data && auth.login(data.token, data.user, auth.isAuthorization);
    }, 1500);
  };

  // console.log('Auth page render');

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
          <Flex direction="row-reverse" justify={'space-between'}>
            {/* <Button click={registerHandler} load={loading} validate={false}>
              Registration
            </Button> */}
            <Button click={loginHandler} load={loading} validate={isSuccess}>
              Log In
            </Button>
            <Button click={testValuesOfLogin}>Set test values</Button>
          </Flex>
        </Flex>
      </StyledAuthPage>
    </PageCenter>
  );
};
