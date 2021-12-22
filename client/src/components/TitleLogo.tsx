import React from 'react';
import styled from 'styled-components';
import { Flex } from '../elements/Flex';
import { Image } from '../elements/Image';

const Wrapper = styled.div`
  width: 100%;
  height: 4rem;
`;

interface ITitleLogo {
  src: string;
}

export const TitleLogo: React.FC<ITitleLogo> = ({ src }) => {
  return (
    <Wrapper>
      <Flex parentHeight align={'center'} justify={'center'}>
        <Image src={src} />
      </Flex>
    </Wrapper>
  );
};
