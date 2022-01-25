import React from 'react';
import styled, { css } from 'styled-components';

type align = 'center' | 'flex-end' | 'flex-start';
type direction = 'column' | 'row' | 'column-reverse' | 'row-reverse';
type justify =
  | 'center'
  | 'flex-end'
  | 'flex-start'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

interface IStyledFlex {
  click?: { (): void };
  direction?: direction;
  align?: align;
  justify?: justify;
  margin?: string;
  parentHeight?: boolean;
  height?: string;
  width?: string;
}

//interface IFlex extends IStyledFlex {}

const StyledFlex = styled.div<IStyledFlex>`
  display: flex;
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};

  ${(props) =>
    props.parentHeight &&
    css`
      height: 100%;
    `};

  ${(props) =>
    props.click &&
    css`
      cursor: pointer;
    `};

  flex-direction: ${(props) => props.direction || 'row'};
  align-items: ${(props) => props.align || 'strech'};
  justify-content: ${(props) => props.justify || 'strech'};
  margin: ${({ margin }) => margin || '0'};
`;

export const Flex: React.FC<IStyledFlex> = ({ click, ...props }) => {
  return <StyledFlex onClick={click} click={click} {...props} />;
};
