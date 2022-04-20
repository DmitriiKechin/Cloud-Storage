import React, { useLayoutEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import adaptiveSize from '../helpers/adaptiveSize';
import formattedDate from '../helpers/formattedDate';
import formattedSize from '../helpers/formattedSize';
import getIcon from '../helpers/getIcon';
import nameShort from '../helpers/nameShort';
import { useAction } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IFile } from '../Types/types';
import ControlButtons from './ControlButtons';

const Wrapper = styled.div`
  height: 2.7rem;
  width: 100%;
  min-height: 2.7rem;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.3rem 0.5rem;

  border-top: 0.1rem solid ${(props) => props.theme.colors.lightSecondary};
  background-color: rgba(0, 0, 0, 0);

  color: ${(props) => props.theme.colors.lightPrimary};
  overflow: hidden;
  &:hover {
    box-shadow: inset 0 0 0.5rem rgba(255, 255, 255, 0.7);
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Name = styled.div`
  color: ${(props) => props.theme.colors.lightPrimary};
  font-size: 0.8rem;
  width: 50%;
  overflow: hidden;
  @media (max-width: 355px) {
    width: 72%;
  }
`;

const Icon = styled.div`
  height: 100%;
  width: 6%;
`;

const Type = styled.div`
  width: 10%;
  text-align: center;
  font-size: 0.8rem;
  text-align: center;
  overflow: hidden;
  @media (max-width: 675px) {
    display: none;
  }
`;

const Date = styled.div`
  width: 20%;
  font-size: 0.8rem;
  text-align: center;
  @media (max-width: 675px) {
    width: 25%;
  }
  @media (max-width: 355px) {
    display: none;
  }
`;

const Size = styled.div`
  width: 10%;
  text-align: right;
  font-size: 0.8rem;
  @media (max-width: 675px) {
    width: 15%;
  }
  @media (max-width: 355px) {
    width: 20%;
  }
`;

const Menu = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  right: -1rem;
  width: 0;
  height: 100%;

  padding-right: 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.darkPrimary};

  border-radius: 2rem;
  transition: width 0.3s;

  ${(props) =>
    props.active &&
    css`
     			width: ${adaptiveSize({
            minSize: '330px',
            maxSize: '460px',
            maxWidth: '1100px',
            minWidth: '700px',
          })}
		
      box-shadow: -0.2rem 0 0.3rem rgba(0, 0, 0, 0.7);
			@media ${(props) => props.theme.media.desktop} {
				width: 460px;
			}

			@media ${(props) => props.theme.media.mobile} {
				width: ${adaptiveSize({
          minSize: '312px',
          maxSize: '330px',
          maxWidth: '700px',
          minWidth: '320px',
        })}
  }
    `}
`;

interface IFileRow extends IFile {
  update: boolean;
}

export const FileRow: React.FC<IFileRow> = ({
  type,
  name,
  date,
  _id,
  parent,
  size,
  update,
}) => {
  const nameRef = useRef<HTMLDivElement>(null);
  const shortNameRef = useRef<string>();
  const { setCurrentFolder, setParentFolder, setTarget, setTargetType } =
    useAction();
  const { parentFolder } = useTypedSelector((state) => state.storagePage);
  const [isActive, setIsActive] = useState<boolean>(false);

  const click = (): void => {
    setIsActive(false);
    document.body.removeEventListener('click', click);
  };

  let shortName = '';

  useLayoutEffect(() => {
    if (nameRef.current) {
      const nameWidth = nameRef.current.clientWidth;
      shortNameRef.current = nameShort(
        name,
        2,
        (51 * nameWidth) / (537 * (1 - 0.00095 * (537 - nameWidth)))
      ); //width = 539
    }
  }, [name, update]);

  shortName = shortNameRef.current || '';
  const icon = getIcon(type);

  return (
    <Wrapper
      onClick={(event: React.MouseEvent) => {
        if (isActive) {
          event.stopPropagation();
          document.body.removeEventListener('click', click);
        }
        setTimeout(() => {
          setIsActive((prev) => !prev);
          setTimeout(() => {
            document.body.addEventListener('click', click);
          }, 0);
        }, 0);

        setTarget({ id: _id, parent });
        setTargetType(type);
      }}
      onDoubleClick={() => {
        if (type === 'dir') {
          setCurrentFolder(_id);
          setParentFolder([...parentFolder, parent]);
        }
      }}
    >
      <Menu active={isActive}>
        <ControlButtons parentType="table" />
      </Menu>
      <Icon>{icon}</Icon>
      <Name ref={nameRef}>{shortName}</Name>
      <Date>{formattedDate(date)}</Date>
      <Type>{type}</Type>
      <Size>{formattedSize(size)}</Size>
    </Wrapper>
  );
};
