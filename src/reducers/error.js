import {
  FETCH_EVENTS_SUCCESS,
  LOGIN_SUCCESS, REQUEST_FAILED,CLEAR_ERROR, REQUEST_STARTED, RSVP_FAILED, RSVP_LOADING,
} from '../constants/action_types';

export default (error = '', action) => {
  switch (action.type) {
    case REQUEST_FAILED:
    case RSVP_FAILED:
      return action.error;
    case LOGIN_SUCCESS:
    case FETCH_EVENTS_SUCCESS:
    case REQUEST_STARTED:
    case CLEAR_ERROR:
    case RSVP_LOADING:
      return '';
    default:
      return error;
  }
};
