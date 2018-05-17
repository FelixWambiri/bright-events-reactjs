import {SEARCH_NOT_FOUND} from '../constants/action_types';

export default (message = '', action) => {
  switch (action.type) {
    case SEARCH_NOT_FOUND:
      return action.message;
    default:
      return message;
  }
};
