import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { setSettingUser } from '../actions/settingUser';
import { Flex } from '../elements/Flex';
import { SvgSort } from '../elements/svg/svgSort';
import { SvgTriangleDown } from '../elements/svg/svgTriangleDown';
import useStoragePage from '../hooks/storagePage.hook';
import { typeSort } from '../Types/types';

interface ISort {
  // typeSort: typeSort;
  // setTypeSort: React.Dispatch<React.SetStateAction<typeSort>>;
}

const optionArray: typeSort[] = ['Name', 'Size', 'Date', 'Type'];

const Wrapper = styled.div`
  position: relative;
  width: 9rem;
  padding-right: 7rem;
  height: 100%;
`;

const TypeSort = styled.div<{ isClicked: boolean }>`
  position: absolute;
  top: 0;
  right: 0;

  width: 7rem;
  height: 100%;

  border: 0.1rem solid ${(props) => props.theme.colors.darkPrimary};
  border-radius: 0.9rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  cursor: pointer;
  background-color: ${(props) => props.theme.colors.lightSecondary};

  padding: 0.2rem 0;
  z-index: 100;

  transition: height 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.darkPrimary};
    fill: ${(props) => props.theme.colors.darkPrimary};
    background: ${(props) => props.theme.colors.lightSecondary};
    box-shadow: 0 0 0.35rem ${(props) => props.theme.colors.darkPrimary};

    ${(props) =>
      props.isClicked &&
      css`
        box-shadow: inset 0 0 0.35rem
          ${(props) => props.theme.colors.darkPrimary};
      `}
  }

  &:active {
    box-shadow: inset 0 0 0.35rem ${(props) => props.theme.colors.darkPrimary};
  }

  ${(props) =>
    props.isClicked &&
    css`
      box-shadow: inset 0 0 0.35rem ${(props) => props.theme.colors.darkPrimary};
      height: 400%;
    `}
`;

const MenuItemCurrent = styled.div`
  padding-left: 0.3rem;
  width: 5.8rem;

  font-size: 0.9rem;
  line-height: 0.9rem;
`;

const WrapperSvg = styled.div`
  padding-right: 0.3rem;
  width: 1.1rem;
`;

const MenuItems = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;

  overflow: hidden;
  height: 0;
  width: 100%;

  transition: height 0.3s;

  ${(props) =>
    props.isActive &&
    css`
      height: 100%;
    `}
`;

const MenuItem = styled.div<{ isActive?: boolean; number: number }>`
  padding: 0.065rem 0.3rem;

  position: absolute;
  top: ${(props) => (props.number * 100) / optionArray.length}%;
  left: 0;

  width: 6.8rem;
  border-top: 0.1rem solid ${(props) => props.theme.colors.darkPrimary};
  border-radius: 0.5rem;

  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.darkPrimary};

  ${(props) =>
    props.isActive &&
    css`
      background-color: ${(props) => props.theme.colors.darkSecondary};
      color: ${(props) => props.theme.colors.lightPrimary};
    `}

  &:hover {
    background-color: ${(props) => props.theme.colors.darkSecondary};
    color: ${(props) => props.theme.colors.lightPrimary};
  }
`;

export const Sort: React.FC<ISort> = () => {
  const { typeSort, setTypeSort } = useStoragePage();
  const [isClicked, setIsClicked] = useState(false);

  const TypeSortVisible = () => {
    setIsClicked(false);
    document.body.removeEventListener('click', TypeSortVisible);
  };

  const isActiveDefault = optionArray.map((option) => false);
  isActiveDefault[0] = true;
  const [isActive, setIsActive] = useState<boolean[]>(isActiveDefault);
  return (
    <Wrapper>
      <SvgSort padding="0.1rem" />
      <TypeSort
        isClicked={isClicked}
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          document.body.removeEventListener('click', TypeSortVisible);
          setTimeout(() => {
            setIsClicked((prev) => !prev);
            setTimeout(() => {
              document.body.addEventListener('click', TypeSortVisible);
            }, 0);
          }, 0);
        }}
      >
        <Flex
          align="center"
          justify="space-between"
          width="100%"
          height="2.3rem"
        >
          <MenuItemCurrent>{typeSort}</MenuItemCurrent>
          <WrapperSvg>
            <SvgTriangleDown />
          </WrapperSvg>
        </Flex>

        <MenuItems isActive={isClicked}>
          {optionArray.map((option, index) => {
            return (
              <MenuItem
                number={index}
                key={option}
                isActive={isActive[index]}
                onClick={() => {
                  const falseArray = optionArray.map((option) => false);
                  falseArray[index] = true;
                  setIsActive(falseArray);
                  setTypeSort(option);
                  setSettingUser({ typeSort: option });
                }}
              >
                {option}
              </MenuItem>
            );
          })}
        </MenuItems>
      </TypeSort>
    </Wrapper>
  );
};
