import React from 'react';
import styled from 'styled-components';
import { Flex } from '../elements/Flex';
import { Image } from '../elements/Image';

const Wrapper = styled.header`
  width: 100%;
  height: 2.5rem;
  padding: 0.3rem 1rem;
  background-color: ${(props) => props.theme.colors.darkSecondary};
`;

const Title = styled.h2`
  font-size: 1.1rem;
  line-height: 1.1rem;
  margin-left: 0.5rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.lightPrimary};
`;

const UserName = styled.div`
  font-size: 0.9rem;
  line-height: 1.1rem;
  margin-right: 0.5rem;
  color: ${(props) => props.theme.colors.lightPrimary};
`;

interface ITitleLogo {
  logoSrc: string;
  avatarSrc: string;
  userName: string;
  title: string;
  userMenuHandler: { (): void };
}

export const Header: React.FC<ITitleLogo> = ({
  logoSrc,
  avatarSrc,
  userName,
  title,
  userMenuHandler,
}) => {
  return (
    <Wrapper>
      <Flex
        parentHeight
        align={'center'}
        justify={'space-between'}
        maxWidth="1200px"
      >
        <Flex parentHeight align="center" justify="flex-start">
          <Image width="3.6rem" src={logoSrc} />
          <Title>{title}</Title>
        </Flex>
        <Flex
          parentHeight
          click={userMenuHandler}
          align="center"
          justify="flex-end"
        >
          <UserName>{userName}</UserName>
          <Image circle width="1.9rem" src={avatarSrc} />
        </Flex>
      </Flex>
    </Wrapper>
  );
};
