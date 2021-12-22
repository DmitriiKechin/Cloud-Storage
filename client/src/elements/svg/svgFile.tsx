import React from 'react';
import { PathPrimary, PathSecondary, StyledSVG } from './svgStyled';

export const SvgFile: React.FC = ({ ...props }) => {
  return (
    <StyledSVG {...props} viewBox="0 0 24 24">
      <PathSecondary d="M4,19V5c0-1.657,1.343-3,3-3h7l6,6v11c0,1.657-1.343,3-3,3H7C5.343,22,4,20.657,4,19z"></PathSecondary>
      <PathPrimary d="M14,6V2l6,6h-4C14.895,8,14,7.105,14,6z"></PathPrimary>
    </StyledSVG>
  );
};
