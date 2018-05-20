import {SEARCH_REQUEST, SEARCH_SUCCESS} from '../constants/action_types';

export default (loading = false, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return true;
      case SEARCH_SUCCESS:
          return false
    default:
      return loading;
  }
};
