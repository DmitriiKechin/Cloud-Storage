import React from 'react';
import { CircleSecondary, PathPrimary, StyledSVG } from './svgStyled';

export const SvgAdd: React.FC = ({ ...props }) => {
  return (
    <StyledSVG {...props} viewBox="0 0 24 24">
      <CircleSecondary cx="12" cy="12" r="10"></CircleSecondary>
      <PathPrimary d="M17,11h-3c-0.552,0-1-0.448-1-1V7c0-0.552-0.448-1-1-1s-1,0.448-1,1v3c0,0.552-0.448,1-1,1H7c-0.552,0-1,0.448-1,1	s0.448,1,1,1h3c0.552,0,1,0.448,1,1v3c0,0.552,0.448,1,1,1s1-0.448,1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1-0.448,1-1	S17.552,11,17,11z"></PathPrimary>
    </StyledSVG>
  );
};
