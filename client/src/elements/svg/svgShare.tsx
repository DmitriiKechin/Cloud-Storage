import React from 'react';
import { PathPrimary, PathSecondary, StyledSVG } from './svgStyled';

export const SvgShare: React.FC = ({ ...props }) => {
  return (
    <StyledSVG {...props} viewBox="0 0 24 24">
      <PathPrimary d="M8.981,11.815l6.29-2.903c-0.735-0.69-1.203-1.65-1.253-2.725l-6.29,2.903C8.464,9.778,8.931,10.739,8.981,11.815z" />
      <PathPrimary d="M15.272,15.089l-6.29-2.903c-0.05,1.075-0.518,2.036-1.253,2.726l6.29,2.903C14.069,16.739,14.536,15.778,15.272,15.089z" />
      <PathSecondary d="M5,8c-2.209,0-4,1.791-4,4s1.791,4,4,4s4-1.791,4-4S7.209,8,5,8z" />
      <PathSecondary d="M18,2c-2.209,0-4,1.791-4,4s1.791,4,4,4s4-1.791,4-4S20.209,2,18,2z" />
      <PathSecondary d="M18,14c-2.209,0-4,1.791-4,4s1.791,4,4,4s4-1.791,4-4S20.209,14,18,14z" />
    </StyledSVG>
  );
};
