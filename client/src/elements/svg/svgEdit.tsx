import React from 'react';
import {
  PathPrimary,
  PathSecondary,
  PolygonPrimary,
  StyledSVG,
} from './svgStyled';

export const SvgEdit: React.FC = ({ ...props }) => {
  return (
    <StyledSVG {...props} viewBox="0 0 24 24">
      <PathSecondary d="M20.011,3.989c-1.318-1.318-3.455-1.318-4.773,0L4.208,14.998c-0.302,0.302-0.503,0.689-0.576,1.11	l-0.615,3.567c-0.133,0.772,0.538,1.442,1.31,1.308l3.525-0.613c0.418-0.073,0.804-0.273,1.104-0.573L20.011,8.761	C21.33,7.443,21.33,5.307,20.011,3.989z"></PathSecondary>
      <PolygonPrimary points="13.075,6.144 17.848,10.917 19.832,8.94 15.059,4.167"></PolygonPrimary>
      <PathPrimary d="M3.392,17.5l-0.375,2.175c-0.133,0.772,0.538,1.442,1.31,1.308l2.171-0.378L3.392,17.5z"></PathPrimary>
    </StyledSVG>
  );
};
