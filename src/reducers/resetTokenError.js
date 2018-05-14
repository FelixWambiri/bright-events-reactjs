import { RESET_TOKEN_ERROR } from '../constants/action_types';

export default (error = '', action) => {
  switch (action.type) {
    case RESET_TOKEN_ERROR:
      return action.error;
    default:
      return error;
  }
};
