import React from 'react';
import { StyledSVG } from './svgStyled';

export const SvgAddImage: React.FC = ({ ...props }) => {
  return (
    <StyledSVG
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M 4 4 C 2.9069372 4 2 4.9069372 2 6 L 2 18 C 2 19.093063 2.9069372 20 4 20 L 12 20 L 12 18 L 4 18 L 4 6 L 20 6 L 20 12 L 22 12 L 22 6 C 22 4.9069372 21.093063 4 20 4 L 4 4 z M 14.5 11 L 11 15 L 8.5 12.5 L 5.7773438 16 L 16 16 L 16 13 L 14.5 11 z M 18 14 L 18 18 L 14 18 L 14 20 L 18 20 L 18 24 L 20 24 L 20 20 L 24 20 L 24 18 L 20 18 L 20 14 L 18 14 z"></path>
    </StyledSVG>
  );
};
