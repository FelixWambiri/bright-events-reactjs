import { FETCH_GUESTS_SUCCESS } from '../constants/action_types';
import ApiService from '../helpers/ApiService';
import { requestFailed, requestStarted } from './api.actions';

export const guestsFetchSuccess = guests => ({
  type: FETCH_GUESTS_SUCCESS,
  guests,
});

export const doFetchGuests = eventId => (dispatch) => {
  dispatch(requestStarted());
 return ApiService.events.guests(eventId)
    .then((response) => {
      dispatch(guestsFetchSuccess(response.guests));
    })
    .catch((error) => {
      dispatch(requestFailed(error.message));
    });
};
