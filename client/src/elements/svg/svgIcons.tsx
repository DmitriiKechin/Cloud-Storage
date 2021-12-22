import React from 'react';
import { PathPrimary, PathSecondary, StyledSVG } from './svgStyled';

export const SvgIcons: React.FC = ({ ...props }) => {
  return (
    <StyledSVG {...props} viewBox="0 0 24 24">
      <PathSecondary d="M13,9V6c0-1.105,0.895-2,2-2h5c1.105,0,2,0.895,2,2v3c0,1.105-0.895,2-2,2h-5 C13.895,11,13,10.105,13,9z"></PathSecondary>
      <PathPrimary d="M13,18v-3c0-1.105,0.895-2,2-2h5c1.105,0,2,0.895,2,2v3c0,1.105-0.895,2-2,2h-5C13.895,20,13,19.105,13,18z"></PathPrimary>
      <PathPrimary d="M2,9V6c0-1.105,0.895-2,2-2h5c1.105,0,2,0.895,2,2v3c0,1.105-0.895,2-2,2H4C2.895,11,2,10.105,2,9z"></PathPrimary>
      <PathSecondary d="M2,18v-3c0-1.105,0.895-2,2-2h5c1.105,0,2,0.895,2,2v3c0,1.105-0.895,2-2,2H4 C2.895,20,2,19.105,2,18z"></PathSecondary>
    </StyledSVG>
  );
};
