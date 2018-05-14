import {
  CATEGORIES_FETCHED,
  FETCH_EVENTS_SUCCESS, FETCH_MAP_SUCCESS, FETCH_GUESTS_SUCCESS, FETCH_REPORTS_SUCCESS, LOGIN_SUCCESS, REQUEST_FAILED,
  REQUEST_STARTED, RSVP_SUCCESS, SIGNUP_SUCCESS, FETCH_MY_EVENTS_SUCCESS, EMAIL_SENT, TOKEN_VERIFIED,
} from '../constants/action_types';

export default (isLoading = false, action) => {
  switch (action.type) {
    case REQUEST_STARTED:
      return true;
    case REQUEST_FAILED:
    case LOGIN_SUCCESS:
    case FETCH_EVENTS_SUCCESS:
    case SIGNUP_SUCCESS:
    case FETCH_MAP_SUCCESS:
    case FETCH_REPORTS_SUCCESS:
    case RSVP_SUCCESS:
    case FETCH_MY_EVENTS_SUCCESS:
    case CATEGORIES_FETCHED:
    case FETCH_GUESTS_SUCCESS:
    case EMAIL_SENT:
    case TOKEN_VERIFIED:
      return false;
    default:
      return isLoading;
  }
};
