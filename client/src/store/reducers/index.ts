import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { messageReducer } from './messageReducer';

export const rootReducer = combineReducers({
  message: messageReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
