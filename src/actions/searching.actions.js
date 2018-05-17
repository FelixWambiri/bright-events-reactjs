import history from '../helpers/history';
import ApiService from '../helpers/ApiService';
import { requestFailed, requestStarted } from './api.actions';
import { SEARCH_NOT_FOUND, SEARCH_REQUEST, SEARCH_SUCCESS } from '../constants/action_types';
import { receiveEvents } from './events';

export const searchRequest = () => ({ type: SEARCH_REQUEST });
export const searchSuccess = events => ({ type: SEARCH_SUCCESS, events });
export const searchNotFound = message => ({ type: SEARCH_NOT_FOUND, message });
export const searchEvents = (query, type) => (dispatch) => {
  dispatch(requestStarted());
  return ApiService.events.search(query, type)
    .then((response) => {
      dispatch(receiveEvents(response.events));
      return response;
    })
    .catch((response) => {
      try {
        response.then(error => dispatch(searchNotFound(error.message)));
      } catch (error) {
        dispatch(requestFailed('An Error Occurred while connecting to the server'));
      }
    });
};
