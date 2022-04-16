import * as MessageActionCreators from './message';
import * as AuthActionCreators from './auth';

const ActionCreators = {
  ...MessageActionCreators,
  ...AuthActionCreators,
};

export default ActionCreators;
