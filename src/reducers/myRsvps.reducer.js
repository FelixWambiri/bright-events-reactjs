import { FETCH_MY_RSVPS_SUCCESS } from '../constants/action_types';

export default (events = [], action) => {
  switch (action.type) {
    case FETCH_MY_RSVPS_SUCCESS:
      return action.myRsvps;
    default:
      return events;
  }
};
