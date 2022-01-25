import React from 'react';
import { PathPrimary, PathSecondary, StyledSVG } from './svgStyled';

export const SvgOpenFolder: React.FC = ({ ...props }) => {
  return (
    <StyledSVG {...props} viewBox="0 0 24 24">
      <PathPrimary d="M3.501,8h16.999C21.068,8,21.584,8.19,22,8.504V8c0-1.657-1.343-3-3-3h-8l-0.544-1.632C10.184,2.551,9.419,2,8.558,2H4	C2.895,2,2,2.895,2,4v4.504C2.416,8.19,2.932,8,3.501,8z" />
      <PathSecondary d="M20.499,8H3.501c-1.545,0-2.72,1.387-2.466,2.911l1.097,6.582C2.373,18.94,3.624,20,5.091,20h13.818	c1.467,0,2.718-1.06,2.959-2.507l1.097-6.582C23.219,9.387,22.044,8,20.499,8z" />
    </StyledSVG>
  );
};
