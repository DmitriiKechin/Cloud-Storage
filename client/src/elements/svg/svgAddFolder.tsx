import React from 'react';
import { PathPrimary, PathSecondary, StyledSVG } from './svgStyled';

export const SvgAddFolder: React.FC = ({ ...props }) => {
  return (
    <StyledSVG {...props} viewBox="0 0 24 24">
      <PathSecondary d="M22,16.38V8c0-1.657-1.343-3-3-3h-8L6,4L2,5v12c0,1.657,1.343,3,3,3 h10.141c0.446,1.722,1.997,3,3.859,3c2.209,0,4-1.791,4-4C23,17.992,22.615,17.083,22,16.38z"></PathSecondary>
      <PathPrimary d="M11,5H2V4c0-1.105,0.895-2,2-2h4.558c0.861,0,1.625,0.551,1.897,1.368L11,5z"></PathPrimary>
      <PathPrimary d="M19,14c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S21.76,14,19,14z M21.5,20H20v1.5c0,0.55-0.45,1-1,1s-1-0.45-1-1V20h-1.5 c-0.55,0-1-0.45-1-1s0.45-1,1-1H18v-1.5c0-0.55,0.45-1,1-1s1,0.45,1,1V18h1.5c0.55,0,1,0.45,1,1S22.05,20,21.5,20z"></PathPrimary>
    </StyledSVG>
  );
};
