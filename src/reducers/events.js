import { FETCH_EVENTS_SUCCESS, REQUEST_STARTED } from '../constants/action_types';

export default (events = [], action) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      if (action.loadMore) {
        return events.concat(action.events);
      }
      return action.events;


    default:
      return events;
  }
};
