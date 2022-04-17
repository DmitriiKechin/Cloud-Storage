import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { messageReducer } from './messageReducer';
import { requestReducer } from './requestReducer';

export const rootReducer = combineReducers({
  message: messageReducer,
  auth: authReducer,
  request: requestReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
