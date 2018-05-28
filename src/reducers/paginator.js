import { FETCH_EVENTS_SUCCESS } from '../constants/action_types';

export default (paginator = {}, action) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return Object.assign({}, paginator, { hasNext: action.hasNext });
    default:
      return paginator;
  }
};
