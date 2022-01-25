import React from 'react';
import styled from 'styled-components';

const Column = styled.div`
  display: none;
  position: fixed;
  top: 0;

  height: 100vh;
  width: calc((100vw - 1100px - 0.5rem) / 2);
  background-color: rgba(0, 0, 0, 0.35);

  @media ${(props) => props.theme.media.desktop} {
    display: block;
  }
`;

const ColumnRight = styled(Column)`
  right: 0;
  box-shadow: inset 2.5rem 0 2rem -2.1rem black;
`;

const ColumnLeft = styled(Column)`
  left: 0;
  box-shadow: inset -2.5rem 0 2rem -2.1rem black;
`;

const Frame: React.FC = () => {
  return (
    <>
      <ColumnLeft />
      <ColumnRight />
    </>
  );
};

export default Frame;
