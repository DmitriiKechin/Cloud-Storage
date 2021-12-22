import React from 'react';
import { CirclePrimary, PathSecondary, StyledSVG } from './svgStyled';

export const SvgList: React.FC = ({ ...props }) => {
  return (
    <StyledSVG {...props} viewBox="0 0 24 24">
      <PathSecondary d="M20,4c-0.186,0-9.814,0-10,0C9.448,4,9,4.448,9,5c0,0.552,0.448,1,1,1c0.186,0,9.814,0,10,0	c0.552,0,1-0.448,1-1C21,4.448,20.552,4,20,4z"></PathSecondary>
      <CirclePrimary cx="5" cy="5" r="2"></CirclePrimary>
      <PathSecondary d="M20,11c-0.186,0-9.814,0-10,0c-0.552,0-1,0.448-1,1c0,0.552,0.448,1,1,1c0.186,0,9.814,0,10,0	c0.552,0,1-0.448,1-1C21,11.448,20.552,11,20,11z"></PathSecondary>
      <CirclePrimary cx="5" cy="12" r="2"></CirclePrimary>
      <PathSecondary d="M20,18c-0.186,0-9.814,0-10,0c-0.552,0-1,0.448-1,1c0,0.552,0.448,1,1,1c0.186,0,9.814,0,10,0	c0.552,0,1-0.448,1-1C21,18.448,20.552,18,20,18z"></PathSecondary>
      <CirclePrimary cx="5" cy="19" r="2"></CirclePrimary>
    </StyledSVG>
  );
};
