import * as MessageActionCreators from './message';
import * as AuthActionCreators from './auth';
import * as RequestActionsCreators from './request';
import * as StoragePageActionsCreators from './storagePage';

const ActionCreators = {
  ...MessageActionCreators,
  ...AuthActionCreators,
  ...RequestActionsCreators,
  ...StoragePageActionsCreators,
};

export default ActionCreators;
