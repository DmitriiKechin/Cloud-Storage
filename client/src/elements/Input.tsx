import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div<{ margin?: string }>`
  position: relative;
  margin: ${(props) => props.margin || '0'};
`;

const Label = styled.label`
  color: ${(props) => props.theme.colors.darkPrimary};
  font-size: 1rem;
  line-height: 1rem;
  height: 1rem;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  background-color: transparent;
  padding: 0 0.5rem;
  //border-radius: 3rem;
  left: 0.5rem;
  top: 50%;
  z-index: 2;
  transform: translate(0, -50%);
  transition: 0.3s ease all;
`;

const LabelBackground = styled.label`
  color: transparent;
  background-color: ${(props) => props.theme.colors.darkSecondary};
  position: absolute;
  top: 0;
  left: 1rem;
  transform: translateY(-50%);

  font-size: 0;
  line-height: 0.75rem;
  height: 0.75rem;
  z-index: 1;
  transition: 0.3s ease all;
`;

const Span = styled.span`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  display: block;
  width: 85%;
  border-radius: 3rem;

  &:before,
  &:after {
    content: '';
    position: absolute;
    height: 0.09rem;
    //height: 0.1rem;
    width: 0;

    background: ${(props) => props.theme.colors.lightPrimary};
    transition: 0.2s ease all 0.15s;
  }

  &::before {
    left: 50%;
  }

  &::after {
    right: 50%;
  }
`;

const SpanBottom = styled(Span)`
  bottom: 0;
  &:before,
  &:after {
    bottom: 0;
  }
`;

const SpanTop = styled(Span)`
  top: 0;
  &:before,
  &:after {
    top: 0;
  }
`;

const InputElement = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  display: block;
  width: 100%;
  border: 3px solid ${(props) => props.theme.colors.darkPrimary};
  border-radius: 3rem;
  background-color: transparent;
  color: ${(props) => props.theme.colors.lightPrimary};

  transition: border-bottom 0.1s 0.05s, border-left 0.1s, border-right 0.1s,
    border-top 0.1s 0.05s;

  &:focus {
    outline: none;
    border: 3px solid ${(props) => props.theme.colors.lightPrimary};
    transition: border-bottom 0.1s 0.15s, border-left 0.1s 0.2s,
      border-right 0.1s 0.2s, border-top 0.1s 0.15s;
  }

  &:focus ~ ${Span}::before, &:focus ~ ${Span}::after {
    width: 50%;
    transition: 0.2s ease all;
  }

  &:focus ~ ${Label}, &:not(:placeholder-shown) ~ ${Label} {
    left: 1rem;
    top: 0;
    font-size: 0.75rem;
    line-height: 0.75rem;
    height: 0.75rem;
  }

  &:focus ~ ${LabelBackground}, &:not(:placeholder-shown) ~ ${LabelBackground} {
    transform: translateY(-50%);
    padding: 0 0.5rem;
    font-size: 0.75rem;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s,
      border-bottom 0.1s 0.15s, border-left 0.1s 0.2s, border-right 0.1s 0.2s,
      border-top 0.1s 0.15s;
  }
`;

interface IInput {
  name: string;
  labelTitle: string;
  changeHandler: { (event: React.ChangeEvent<HTMLInputElement>): void };
  type: 'text' | 'password' | 'email';
  value: string;
  required?: boolean;
  margin?: string;
}

export const Input: React.FC<IInput> = ({
  labelTitle,
  name,
  changeHandler,
  value,
  type,
  required,
  margin,
}) => {
  // const keyPressHandler = (event: React.KeyboardEvent) => {
  //   if (event.key === 'Enter') {
  //     console.log('Enter');
  //   }
  // };

  return (
    <InputWrapper margin={margin}>
      <InputElement
        onChange={changeHandler}
        name={name}
        value={value}
        type={type}
        // onKeyPress={keyPressHandler}
        placeholder=" "
        required={required ? required : false}
      />
      <LabelBackground>{labelTitle}</LabelBackground>
      <SpanTop />
      <SpanBottom />
      <Label>{labelTitle}</Label>
    </InputWrapper>
  );
};
