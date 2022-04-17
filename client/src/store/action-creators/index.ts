import * as MessageActionCreators from './message';
import * as AuthActionCreators from './auth';
import * as RequestActionsCreators from './request';

const ActionCreators = {
  ...MessageActionCreators,
  ...AuthActionCreators,
  ...RequestActionsCreators,
};

export default ActionCreators;
