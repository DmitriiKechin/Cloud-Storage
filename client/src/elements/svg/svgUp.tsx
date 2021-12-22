import React from 'react';
import { PathPrimary, PathSecondary, StyledSVG } from './svgStyled';

export const SvgUp: React.FC = ({ ...props }) => {
  return (
    <StyledSVG {...props} viewBox="0 0 24 24">
      <PathSecondary d="M12,6H8V3.706c0-0.615-0.742-0.924-1.178-0.491L2.717,7.289c-0.395,0.391-0.395,1.03,0,1.421	l4.104,4.075C7.258,13.218,8,12.908,8,12.294V10h4c4.351,0,5,2.661,5,4h4C21,10.31,18.643,6,12,6z"></PathSecondary>
      <PathPrimary d="M16,22c-0.513,0-1.024-0.196-1.415-0.587c-0.78-0.781-0.78-2.046,0-2.827C15.214,17.951,17,15.753,17,14c0-6.845-5-8-5-8	c6.643,0,9,4.31,9,8c0,3.726-3.22,7.049-3.587,7.415C17.022,21.805,16.512,22,16,22z"></PathPrimary>
    </StyledSVG>
  );
};
