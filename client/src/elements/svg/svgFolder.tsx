import React from 'react';
import { PathPrimary, PathSecondary, StyledSVG } from './svgStyled';

export const SvgFolder: React.FC = ({ ...props }) => {
  return (
    <StyledSVG {...props} viewBox="0 0 24 24">
      <PathSecondary d="M19,20H5c-1.657,0-3-1.343-3-3V5h17c1.657,0,3,1.343,3,3v9C22,18.657,20.657,20,19,20z"></PathSecondary>
      <PathPrimary d="M11,5H2V4c0-1.105,0.895-2,2-2h4.558c0.861,0,1.625,0.551,1.897,1.368L11,5z"></PathPrimary>
    </StyledSVG>
  );
};
