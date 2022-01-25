import React from 'react';
import styled from 'styled-components';
import { Flex } from '../elements/Flex';
import { Image } from '../elements/Image';
import { SvgLogo } from '../elements/svg/svgLogo';

const Wrapper = styled.header`
  flex: 0 0 2.5rem;
  width: 100%;
  height: 2.5rem;
  padding: 0.3rem 1rem;
  background-color: ${(props) => props.theme.colors.darkSecondary};
`;

const Title = styled.h2`
  display: block;
  width: 100%;

  border-left: 0.3rem solid ${(props) => props.theme.colors.lightPrimary};
  padding-left: 0.3rem;
  font-size: 1rem;
  line-height: 1rem;
  /* margin-left: 0.5rem; */
  font-weight: 400;
  color: ${(props) => props.theme.colors.lightPrimary};
`;

const UserName = styled.div`
  font-size: 0.9rem;
  line-height: 1.1rem;
  margin-right: 0.5rem;
  color: ${(props) => props.theme.colors.lightPrimary};
`;

const FlexWrapper = styled(Flex)`
  margin: auto;
  max-width: ${(props) => props.theme.sizes.wrapper};
`;

interface ITitleLogo {
  avatarSrc: string;
  userName: string;
  title: string;
  userMenuHandler: { (): void };
}

export const Header: React.FC<ITitleLogo> = ({
  avatarSrc,
  userName,
  title,
  userMenuHandler,
}) => {
  return (
    <Wrapper>
      <FlexWrapper parentHeight align={'center'} justify={'space-between'}>
        <Flex align="center" justify="flex-start" height="100%" width="10rem">
          <SvgLogo />
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
      </FlexWrapper>
    </Wrapper>
  );
};
