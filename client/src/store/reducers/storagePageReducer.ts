import {
  StoragePageAction,
  storagePageActionTypes,
  StoragePageState,
} from '../../Types/storagePage';

const initialState: StoragePageState = {
  currentFolder: '',
  isTable: false,
  parentFolder: [''],
  target: {
    id: '',
    parent: '',
  },
  targetCountFiles: '',
  targetDate: '',
  targetType: '',
  targetName: 'Всего',
  typeSort: 'Name',
  targetSize: '0',
  uploadedFiles: [],
  updateFiles: false,
};

export const storagePageReducer = (
  state = initialState,
  action: StoragePageAction
): StoragePageState => {
  switch (action.type) {
    case storagePageActionTypes.CURRENT_FOLDER:
      return { ...state, currentFolder: action.payload };

    case storagePageActionTypes.IS_TABLE:
      return { ...state, isTable: action.payload };

    case storagePageActionTypes.PARENT_FOLDER:
      return { ...state, parentFolder: action.payload };

    case storagePageActionTypes.TARGET:
      return { ...state, target: action.payload };

    case storagePageActionTypes.TARGET_COUNT_FILES:
      return { ...state, targetCountFiles: action.payload };

    case storagePageActionTypes.TARGET_DATE:
      return { ...state, targetDate: action.payload };

    case storagePageActionTypes.TARGET_NAME:
      return { ...state, targetName: action.payload };

    case storagePageActionTypes.TARGET_SIZE:
      return { ...state, targetSize: action.payload };

    case storagePageActionTypes.TARGET_TYPE:
      return { ...state, targetType: action.payload };

    case storagePageActionTypes.TYPE_SORT:
      return { ...state, typeSort: action.payload };

    case storagePageActionTypes.UPLOADED_FILES:
      return { ...state, uploadedFiles: action.payload };

    case storagePageActionTypes.UPDATE_FILES:
      return { ...state, updateFiles: !state.updateFiles };

    default:
      return state;
  }
};
