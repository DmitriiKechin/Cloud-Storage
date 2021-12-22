import React from 'react';
import { PathPrimary, PathSecondary, StyledSVG } from './svgStyled';

export const SvgDelete: React.FC = ({ ...props }) => {
  return (
    <StyledSVG {...props} viewBox="0 0 24 24">
      <PathSecondary d="M17,22H7c-1.657,0-3-1.343-3-3V6h16v13C20,20.657,18.657,22,17,22z"></PathSecondary>
      <PathPrimary d="M16,4H8V3c0-0.552,0.448-1,1-1h6c0.552,0,1,0.448,1,1V4z"></PathPrimary>
      <PathPrimary d="M19,3C18.399,3,5.601,3,5,3C3.895,3,3,3.895,3,5c0,1.105,0.895,2,2,2c0.601,0,13.399,0,14,0c1.105,0,2-0.895,2-2	C21,3.895,20.105,3,19,3z"></PathPrimary>
      <PathPrimary d="M14.812,18.215l-7.027-7.027c-0.384-0.384-0.384-1.008,0-1.392l0.011-0.011c0.384-0.384,1.008-0.384,1.392,0l7.027,7.027	c0.384,0.384,0.384,1.008,0,1.392l-0.011,0.011C15.82,18.599,15.196,18.599,14.812,18.215z"></PathPrimary>
      <PathPrimary d="M7.785,16.812l7.027-7.027c0.384-0.384,1.008-0.384,1.392,0l0.011,0.011c0.384,0.384,0.384,1.008,0,1.392l-7.027,7.027	c-0.384,0.384-1.008,0.384-1.392,0l-0.011-0.011C7.401,17.82,7.401,17.196,7.785,16.812z"></PathPrimary>
    </StyledSVG>
  );
};
