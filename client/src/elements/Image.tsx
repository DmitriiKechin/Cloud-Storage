import React from 'react';
import styled, { css } from 'styled-components';

interface IWrapper {
  width?: string;
  height?: string;
  circle?: boolean;
}

const Wrapper = styled.div<IWrapper>`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};
  position: relative;
  overflow: hidden;

  ${(props) =>
    props.circle &&
    css`
      border-radius: 50%;
      border: 0.1rem solid ${(props) => props.theme.colors.darkPrimary};
    `};
`;

const ImageStyled = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

interface IImage extends IWrapper {
  src: string;
}

export const Image: React.FC<IImage> = ({ src, width, circle, height }) => {
  return (
    <Wrapper width={width} circle={circle} height={height}>
      <ImageStyled src={src} alt="" />
    </Wrapper>
  );
};
