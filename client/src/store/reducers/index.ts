import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { messageReducer } from './messageReducer';
import { requestReducer } from './requestReducer';
import { storagePageReducer } from './storagePageReducer';

export const rootReducer = combineReducers({
  message: messageReducer,
  auth: authReducer,
  request: requestReducer,
  storagePage: storagePageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
