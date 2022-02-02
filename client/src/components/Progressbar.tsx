import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 0.5rem;
  padding: 2px;

  background-color: ${(props) => props.theme.colors.darkPrimary};
  box-shadow: inset 0 0 0.12rem rgba(0, 0, 0, 0.6);

  border-radius: 0.17rem;
`;

const ProgressLine = styled.div<{ width: number }>`
  height: 100%;
  width: ${(props) => props.width}%;
  border-radius: 0.13rem;

  background-color: ${(props) => props.theme.colors.accent};
  box-shadow: inset 0 0 0.06rem rgba(0, 0, 0, 0.7);
`;

interface IProgressbar {
  progress: number;
}

export const Progressbar: React.FC<IProgressbar> = ({ progress }) => {
  return (
    <Wrapper>
      <ProgressLine width={progress} />
    </Wrapper>
  );
};
