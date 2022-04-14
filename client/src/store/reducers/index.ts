import { combineReducers } from 'redux';
import { messageReducer } from './messageReducer';

export const rootReducer = combineReducers({
  message: messageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
