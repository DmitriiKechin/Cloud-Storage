import React from 'react';
import styled from 'styled-components';
import { buttonStyled, IButtonStyled } from './Button';

interface IFileLoad extends IButtonStyled {
  changeHandler: {
    (event: React.ChangeEvent<HTMLInputElement>): Promise<void>;
  };
}

const InputStyled = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`;

const LabelStyled = styled.label<IButtonStyled>`
  ${buttonStyled}
`;

const FileLoadElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FileLoad: React.FC<IFileLoad> = ({
  children,
  changeHandler,
  ...props
}) => {
  return (
    <FileLoadElement>
      <LabelStyled {...props}>
        {children}
        <InputStyled name="file" type="file" onChange={changeHandler} />
      </LabelStyled>
    </FileLoadElement>
  );
};
