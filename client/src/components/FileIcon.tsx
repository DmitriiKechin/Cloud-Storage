import React from 'react';
import styled from 'styled-components';
import formattedDate from '../global_Function/formattedDate';
import formattedSize from '../global_Function/formattedSize';
import getIcon from '../global_Function/getIcon';
import nameShort from '../global_Function/nameShort';
import { useAction } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IFile } from '../Types/types';

const Wrapper = styled.div<{ margin?: string }>`
  height: 7.5rem;
  width: 6rem;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0);
  margin: ${(props) => props.margin || 0};

  &:hover {
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.7);
    background-color: rgba(255, 255, 255, 0.03);
    /* background-color: ${(props) => props.theme.colors.darkPrimary}; */
  }
  &:focus {
    /* background-color: rgba(0, 0, 0, 0.5); */
    background-color: ${(props) => props.theme.colors.darkPrimary}77;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.7);
    outline: none;
  }
`;

const Name = styled.div`
  color: ${(props) => props.theme.colors.lightPrimary};
  font-size: 0.8rem;
  flex: 0 1 50%;
  width: 100%;
  text-align: center;
  overflow: hidden;
`;

interface IFileIcon extends IFile {
  margin?: string;
}

export const FileIcon: React.FC<IFileIcon> = ({
  margin,
  type,
  name,
  date,
  _id,
  parent,
  childs,
  size,
}) => {
  const {
    setCurrentFolder,
    setParentFolder,
    setTarget,
    setTargetCountFiles,
    setTargetDate,
    setTargetSize,
    setTargetType,
    setTargetName,
  } = useAction();

  const { parentFolder } = useTypedSelector((state) => state.storagePage);

  const shortName = nameShort(name);
  const icon = getIcon(type);

  return (
    <Wrapper
      tabIndex={1}
      margin={margin}
      onDoubleClick={() => {
        if (type === 'dir') {
          setCurrentFolder(_id);
          setParentFolder([...parentFolder, parent]);
        }
      }}
      onFocus={() => {
        setTarget({ id: _id, parent });
        setTargetCountFiles(childs.length + ' шт.');
        setTargetDate(formattedDate(date));
        setTargetSize(formattedSize(size));
        setTargetType(type);
        setTargetName(name);
      }}
    >
      {icon}
      <Name>{shortName}</Name>
    </Wrapper>
  );
};
