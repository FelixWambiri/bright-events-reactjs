import { TOGGLE_SEARCH } from '../constants/action_types';

export default (open = false, action) => {
  switch (action.type) {
    case TOGGLE_SEARCH:
      return action.open;
    default:
      return open;
  }
};
