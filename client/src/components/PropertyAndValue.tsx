import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: ${(props) => props.theme.colors.darkPrimary};
  font-size: 0.7rem;
  width: 100%;
  border-top: 0.1rem solid ${(props) => props.theme.colors.darkPrimary};
  /* border-bottom: 0.1rem solid ${(props) =>
    props.theme.colors.darkPrimary}; */
`;

const Property = styled.div`
  align-self: flex-start;
  font-size: inherit;
  color: ${(props) => props.theme.colors.darkPrimary};
`;

const Value = styled.div`
  align-self: flex-end;
  font-size: inherit;
`;

interface IPropertyAndValue {
  property: string;
  value: string;
}

export const PropertyAndValue: React.FC<IPropertyAndValue> = ({
  property,
  value,
}) => {
  return (
    <Wrapper>
      <Property>{property}</Property>
      <Value>{value}</Value>
    </Wrapper>
  );
};
