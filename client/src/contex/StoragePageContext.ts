import React, { createContext } from 'react';
import { ILoadedFile, typeSort } from '../Types/types';

interface IStoragePageContext {
  parentFolder: string[];
  setParentFolder: React.Dispatch<React.SetStateAction<string[]>>;
  currentFolder: string;
  openFolderHandler(id: string): void;

  target: { id: string; parent: string };
  setTarget: React.Dispatch<
    React.SetStateAction<{ id: string; parent: string }>
  >;
  targetSize: string;
  setTargetSize: React.Dispatch<React.SetStateAction<string>>;
  targetName: string;
  setTargetName: React.Dispatch<React.SetStateAction<string>>;
  targetCountFiles: string;
  setTargetCountFiles: React.Dispatch<React.SetStateAction<string>>;
  targetDate: string;
  setTargetDate: React.Dispatch<React.SetStateAction<string>>;
  targetType: string;
  setTargetType: React.Dispatch<React.SetStateAction<string>>;

  typeSort: typeSort;
  setTypeSort: React.Dispatch<React.SetStateAction<typeSort>>;

  isTable: boolean;
  setIsTable: React.Dispatch<React.SetStateAction<boolean>>;

  uploadedFiles: ILoadedFile[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<ILoadedFile[]>>;
}

export const StoragePageContext = createContext<IStoragePageContext>({
  parentFolder: [''],
  setParentFolder: () => {},
  currentFolder: '',
  openFolderHandler: () => {},
  target: { id: '', parent: '' },
  setTarget: () => {},
  targetSize: '',
  setTargetSize: () => {},
  targetCountFiles: '',
  setTargetCountFiles: () => {},
  targetDate: '',
  setTargetDate: () => {},
  targetType: '',
  setTargetType: () => {},
  targetName: '',
  setTargetName: () => {},
  typeSort: 'Name',
  setTypeSort: () => {},
  isTable: false,
  setIsTable: () => {},
  uploadedFiles: [],
  setUploadedFiles: () => {},
});
