import { ILoadedFile, typeSort } from './types';

export interface ITarget {
  id: string;
  parent: string;
}

export interface StoragePageState {
  currentFolder: string;
  parentFolder: string[];
  target: ITarget;
  targetSize: string;
  targetCountFiles: string;
  targetDate: string;
  targetType: string;
  targetName: string;
  typeSort: typeSort;
  isTable: boolean;
  uploadedFiles: ILoadedFile[];
  updateFiles: boolean;
}

export enum storagePageActionTypes {
  CURRENT_FOLDER = 'CURRENT_FOLDER',
  PARENT_FOLDER = 'SET_PARENT_FOLDER',
  TARGET = 'SET_TARGET',
  TARGET_SIZE = 'SET_TARGET_SIZE',
  TARGET_COUNT_FILES = 'TARGET_COUNT_FILES',
  TARGET_DATE = 'TARGET_DATE',
  TARGET_TYPE = 'TARGET_TYPE',
  TARGET_NAME = 'TARGET_NAME',
  TYPE_SORT = 'TYPE_SORT',
  IS_TABLE = 'IS_TABLE',
  UPLOADED_FILES = 'UPLOADED_FILES',
  UPDATE_FILES = 'UPDATE_FILES',
}

interface currentFolderAction {
  type: storagePageActionTypes.CURRENT_FOLDER;
  payload: string;
}

interface parentFolderAction {
  type: storagePageActionTypes.PARENT_FOLDER;
  payload: string[];
}

interface targeAction {
  type: storagePageActionTypes.TARGET;
  payload: ITarget;
}

interface targetSizeAction {
  type: storagePageActionTypes.TARGET_SIZE;
  payload: string;
}

interface targetCountFilesAction {
  type: storagePageActionTypes.TARGET_COUNT_FILES;
  payload: string;
}

interface targetDateAction {
  type: storagePageActionTypes.TARGET_DATE;
  payload: string;
}

interface targetTypeAction {
  type: storagePageActionTypes.TARGET_TYPE;
  payload: string;
}
interface targetNameAction {
  type: storagePageActionTypes.TARGET_NAME;
  payload: string;
}
interface typeSortAction {
  type: storagePageActionTypes.TYPE_SORT;
  payload: typeSort;
}
interface isTableAction {
  type: storagePageActionTypes.IS_TABLE;
  payload: boolean;
}
interface uploadedFiles {
  type: storagePageActionTypes.UPLOADED_FILES;
  payload: ILoadedFile[];
}

interface updateFilesAction {
  type: storagePageActionTypes.UPDATE_FILES;
}

export type StoragePageAction =
  | currentFolderAction
  | parentFolderAction
  | targeAction
  | targetCountFilesAction
  | targetDateAction
  | targetNameAction
  | targetSizeAction
  | targetTypeAction
  | typeSortAction
  | isTableAction
  | uploadedFiles
  | updateFilesAction;
