import { FETCH_EVENTS_SUCCESS } from '../constants/action_types';

export default (events = [], action) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return action.events;
      // return Object.assign([],events,[...action.events]);
    default:
      return events;
  }
};
