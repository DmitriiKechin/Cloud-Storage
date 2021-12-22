import React from 'react';
import styled from 'styled-components';
import { Flex } from './Flex';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const PageCenter: React.FC = ({ children, visible }) => {
  return (
    <Wrapper>
      <Flex parentHeight justify={'center'} align={'center'}>
        {children}
      </Flex>
    </Wrapper>
  );
};
