import { TOGGLE_PASSWORD_FIELD } from '../constants/action_types';

export default (open = false, action) => {
  switch (action.type) {
    case TOGGLE_PASSWORD_FIELD:
      return action.open;
    default:
      return open;
  }
};
