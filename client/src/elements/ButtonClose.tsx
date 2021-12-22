import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { SvgClose } from './svg/svgClose';

interface IButtonClose {
  close(event: React.MouseEvent<HTMLButtonElement>): void;
}

const StyledButtonClose = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 0.75rem;
`;

export const ButtonClose: React.FC<IButtonClose> = ({ close }) => {
  return (
    <StyledButtonClose>
      <Button width="1.5rem" height="1.5rem" padding="0.12rem" click={close}>
        <SvgClose />
      </Button>
    </StyledButtonClose>
  );
};
