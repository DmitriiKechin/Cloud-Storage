import React from 'react';
import {
  CirclePrimary,
  PathPrimary,
  PathSecondary,
  StyledSVG,
} from './svgStyled';

export const SvgImage: React.FC = ({ ...props }) => {
  return (
    <StyledSVG {...props} viewBox="0 0 24 24">
      <PathSecondary d="M4,19V5c0-1.657,1.343-3,3-3h7l6,6v11c0,1.657-1.343,3-3,3H7C5.343,22,4,20.657,4,19z"></PathSecondary>
      <PathPrimary d="M14,6V2l6,6h-4C14.895,8,14,7.105,14,6z"></PathPrimary>
      <CirclePrimary cx="14.5" cy="11.5" r="1.5"></CirclePrimary>
      <PathPrimary d="M7,18.375C7,18.717,7.28,19,7.625,19h8.75C16.72,19,17,18.722,17,18.375C17,17.523,16.528,15,15.5,15c-0.507,0-1.295,1-2,1	c-1.4,0-2.75-3-4-3S7,16.726,7,18.375z"></PathPrimary>
    </StyledSVG>
  );
};
