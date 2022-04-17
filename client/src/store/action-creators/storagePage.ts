import { Dispatch } from 'redux';
import {
  ITarget,
  StoragePageAction,
  storagePageActionTypes,
} from '../../Types/storagePage';
import { ILoadedFile, typeSort } from '../../Types/types';

export const setCurrentFolder = (currentFolder: string) => {
  return (dispatch: Dispatch<StoragePageAction>) => {
    dispatch({
      type: storagePageActionTypes.CURRENT_FOLDER,
      payload: currentFolder,
    });
  };
};

export const setParentFolder = (parentFolder: string[]) => {
  return (dispatch: Dispatch<StoragePageAction>) => {
    dispatch({
      type: storagePageActionTypes.PARENT_FOLDER,
      payload: parentFolder,
    });
  };
};

export const setTarget = (target: ITarget) => {
  return (dispatch: Dispatch<StoragePageAction>) => {
    dispatch({ type: storagePageActionTypes.TARGET, payload: target });
  };
};

export const setTargetSize = (size: string) => {
  return (dispatch: Dispatch<StoragePageAction>) => {
    dispatch({
      type: storagePageActionTypes.TARGET_SIZE,
      payload: size,
    });
  };
};

export const setTargetCountFiles = (countFiles: string) => {
  return (dispatch: Dispatch<StoragePageAction>) => {
    dispatch({
      type: storagePageActionTypes.TARGET_COUNT_FILES,
      payload: countFiles,
    });
  };
};

export const setTargetDate = (date: string) => {
  return (dispatch: Dispatch<StoragePageAction>) => {
    dispatch({
      type: storagePageActionTypes.TARGET_DATE,
      payload: date,
    });
  };
};

export const setTargetType = (type: string) => {
  return (dispatch: Dispatch<StoragePageAction>) => {
    dispatch({
      type: storagePageActionTypes.TARGET_TYPE,
      payload: type,
    });
  };
};

export const setTargetName = (name: string) => {
  return (dispatch: Dispatch<StoragePageAction>) => {
    dispatch({
      type: storagePageActionTypes.TARGET_NAME,
      payload: name,
    });
  };
};

export const setTypeSort = (typeSort: typeSort) => {
  return (dispatch: Dispatch<StoragePageAction>) => {
    dispatch({
      type: storagePageActionTypes.TYPE_SORT,
      payload: typeSort,
    });
  };
};

export const setIsTable = (isTable: boolean) => {
  return (dispatch: Dispatch<StoragePageAction>) => {
    dispatch({
      type: storagePageActionTypes.IS_TABLE,
      payload: isTable,
    });
  };
};

export const setUploadedFiles = (uploadedFiles: ILoadedFile[]) => {
  return (dispatch: Dispatch<StoragePageAction>) => {
    dispatch({
      type: storagePageActionTypes.UPLOADED_FILES,
      payload: uploadedFiles,
    });
  };
};
