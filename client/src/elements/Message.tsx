import React from 'react';
import styled, { css } from 'styled-components';
import useMessage from '../hooks/message.hook';

const MessageStyled = styled.div<{ isText: boolean }>`
  position: absolute;
  padding: 0;
  max-width: 100%;
  left: 0;
  bottom: 0;
  color: ${(props) => props.theme.colors.lightSecondary};
  font-size: 0;
  z-index: 10;
  transition: all 0.3s;

  ${(props) =>
    props.isText &&
    css`
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
    `}

  &::before {
    content: '';
    position: absolute;
    height: 0;
    width: 0;
    top: 0;
    left: 0;
    z-index: -1;
    border-radius: 1rem 1rem 1rem 0;
    background-color: ${(props) => props.theme.colors.darkPrimary};
    opacity: 0.7;
    transition: all 0.3s;

    ${(props) =>
      props.isText &&
      css`
        height: 100%;
        width: 100%;
      `}
  }
`;

export const Message: React.FC = () => {
  const { message } = useMessage();
  const isText = !!message;
  return <MessageStyled isText={isText}>{message}</MessageStyled>;
};
