import React from 'react';
import { PathPrimary, PathSecondary, StyledSVG } from './svgStyled';

export const SvgDownload: React.FC = ({ ...props }) => {
  return (
    <StyledSVG {...props} viewBox="0 0 24 24">
      <PathSecondary d="M19.483,8.192C18.345,5.161,15.429,3,12,3c-4.112,0-7.496,3.104-7.945,7.095C1.746,10.538,0,12.562,0,15 c0,2.761,2.239,5,5,5h13c3.314,0,6-2.686,6-6C24,11.199,22.078,8.854,19.483,8.192z"></PathSecondary>
      <PathPrimary d="M9.522,14c-0.462,0-0.695,0.558-0.37,0.887l2.314,2.336c0.294,0.297,0.775,0.297,1.069,0l2.314-2.336 C15.174,14.558,14.941,14,14.478,14H9.522z"></PathPrimary>
      <PathPrimary d="M11,15V8c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v7c0,0.552-0.448,1-1,1h0C11.448,16,11,15.552,11,15z"></PathPrimary>
    </StyledSVG>
  );
};
