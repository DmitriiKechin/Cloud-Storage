import React from 'react';
import styled, { css, keyframes } from 'styled-components';

export interface IButtonStyled {
  load?: boolean;
  padding?: string;
  validate?: boolean;
  height?: string;
  width?: string;
  dark?: true;
}

interface IButton extends IButtonStyled {
  click: { (event: React.MouseEvent<HTMLButtonElement>): void };
}

const rotating = keyframes`
	from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const buttonStyled = css<IButtonStyled>`
  height: ${(props) => props.height || '2rem'};
  font-size: 1rem;
  padding: ${(props) => props.padding || '0.2rem 0.7rem'};
  text-align: center;
  width: ${(props) => props.width || 'auto'};
  border-radius: 3rem;
  background: transparent;

  border: 0.1rem solid ${(props) => props.theme.colors.lightPrimary};
  color: ${(props) => props.theme.colors.lightPrimary};
  fill: ${(props) => props.theme.colors.lightPrimary};

  ${(props) =>
    props.dark &&
    css`
      border: 0.1rem solid ${(props) => props.theme.colors.darkPrimary};
      color: ${(props) => props.theme.colors.darkPrimary};
      fill: ${(props) => props.theme.colors.darkPrimary};
    `};
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.darkPrimary};
    fill: ${(props) => props.theme.colors.darkPrimary};
    background: ${(props) => props.theme.colors.lightSecondary};
    box-shadow: 0 0 0.35rem ${(props) => props.theme.colors.darkPrimary};
  }

  &:active {
    transform: scale(1.1);
    box-shadow: inset 0 0 0.35rem ${(props) => props.theme.colors.darkPrimary};
  }

  ${(props) =>
    props.load &&
    css`
      width: 2rem;
      border-color: ${(props) => props.theme.colors.darkPrimary};
      border-width: 3px;
      border-left-color: ${(props) => props.theme.colors.lightPrimary};
      animation: ${rotating} 2s 0.25s linear infinite;

      &:hover {
        background: transparent;
      }
    `}

  ${(props) =>
    props.validate &&
    css`
      font-size: 1rem;
      color: ${(props) => props.theme.colors.darkPrimary};
      background: ${(props) => props.theme.colors.lightPrimary};
    `}
`;

const ButtonElement = styled.button<IButtonStyled>`
  ${buttonStyled}
`;

export const Button: React.FC<IButton> = ({ click, children, ...props }) => {
  if (props.validate) {
    children = '✔';
  }

  if (props.load) {
    children = '';
  }

  return (
    <ButtonElement onClick={click} {...props}>
      {children}
    </ButtonElement>
  );
};
