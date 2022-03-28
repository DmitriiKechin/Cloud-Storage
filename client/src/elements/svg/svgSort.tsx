import React from 'react';
import { PathPrimary, PathSecondary, StyledSVG } from './svgStyled';

export const SvgSort: React.FC<{
  padding?: string;
  dark?: boolean;
}> = ({ ...props }) => {
  return (
    <StyledSVG {...props} viewBox="0 0 24 24">
      <PathPrimary d="M17,15V6.084c0-0.874,0.515-1.717,1.348-1.981C19.729,3.665,21,4.684,21,6v9H17z"></PathPrimary>
      <PathPrimary d="M22.798,14.182l-3.085,3.114c-0.393,0.396-1.033,0.396-1.426,0l-3.085-3.114C14.768,13.744,15.079,13,15.695,13h6.609	C22.921,13,23.232,13.744,22.798,14.182z"></PathPrimary>
      <PathSecondary d="M13,17H3c-1.105,0-2,0.895-2,2v0c0,1.105,0.895,2,2,2h10c1.105,0,2-0.895,2-2v0	C15,17.895,14.105,17,13,17z"></PathSecondary>
      <PathSecondary d="M10,10H3c-1.105,0-2,0.895-2,2v0c0,1.105,0.895,2,2,2h7c1.105,0,2-0.895,2-2v0	C12,10.895,11.105,10,10,10z"></PathSecondary>
      <PathSecondary d="M8,3H3C1.895,3,1,3.895,1,5v0c0,1.105,0.895,2,2,2h5c1.105,0,2-0.895,2-2v0C10,3.895,9.105,3,8,3z"></PathSecondary>
    </StyledSVG>
  );
};
