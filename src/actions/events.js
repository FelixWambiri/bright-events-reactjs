import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_MY_EVENTS_SUCCESS,
  FETCH_MY_RSVPS_SUCCESS,
  RSVP_FAILED,
  RSVP_LOADING,
  RSVP_SUCCESS,
  SHOW_SINGLE_EVENT,
  UPDATE_EVENT_SUCCESS,
} from '../constants/action_types';
import 'isomorphic-fetch';
import {clearError, requestFailed, requestStarted} from './api.actions';
import MapService from '../helpers/MapService';
import { fetchedCoordinates } from './map.actions';
import ApiService from '../helpers/ApiService';
import AuthService from '../helpers/AuthService';
import { eventsURL } from '../constants/urls';
import { doFetchGuests } from './guests.action';

import history from '../helpers/history';
import { searchSuccess } from './searching.actions';

export const savedEvent = () => ({
  type: UPDATE_EVENT_SUCCESS,
});


export const fetchMyEventsSuccessful = events => ({
  type: FETCH_MY_EVENTS_SUCCESS,
  events,
});
export const fetchMyRsvpsSuccess = events => ({
  type: FETCH_MY_RSVPS_SUCCESS,
  myRsvps: events,
});

export const receiveEvents = (events, hasNext, loadMore) =>
  ({
    type: FETCH_EVENTS_SUCCESS,
    events,
    loading: false,
    loadMore,
    hasNext,
  });
export const receiveSingleEvent = event =>
  ({
    type: SHOW_SINGLE_EVENT,
    event,
  });
export const rsvpSuccess = () =>
  ({
    type: RSVP_SUCCESS,
  });

const rsvpLoading = () => ({
  type: RSVP_LOADING,
});

const rsvpFailed = error => ({
  type: RSVP_FAILED,
  error,
});

export const fetchEvents = (page, items, loadMore = false) => (dispatch) => {
  dispatch(requestStarted());
  return fetch(`${eventsURL}?page=${page}&limit=${items}`)
    .then(response => response.json())
    .then((json) => {
      dispatch(receiveEvents(json.events, json.has_next, loadMore));
      dispatch(searchSuccess(json.events));
    })
    .catch((error) => {
      dispatch(requestFailed(error.message));
    });
};
export const loadMoreEvents = (page, items) => (dispatch) => {
  dispatch(requestStarted());
  dispatch(clearError())
  return fetch(`${eventsURL}?page=${page}&limit=${items}`)
    .then(response => response.json())
    .then((json) => {
      dispatch(receiveEvents(json.events, json.has_next));
      dispatch(searchSuccess(json.events));
    })
    .catch((error) => {
      dispatch(requestFailed(error.message));
    });
};

const fetchCoordinates = address => MapService(address)
  .then((resp) => {
    const { lat, lng } = resp.results[0].geometry.location;
    return { lat, lng };
  })
  .catch(() => `Could Not Show Map For ${address}`);

export const myEvents = () => (dispatch) => {
  dispatch(requestStarted());
  return ApiService.events.myEvents()
    .then((response) => {
      dispatch(fetchMyEventsSuccessful(response.events));
    })
    .catch((response) => {
      try {
        response.then(error => dispatch(requestFailed(error.message)));
      } catch (error) {
        dispatch(requestFailed('Network Request Failed'));
      }
    });
};
export const myRsvps = () => (dispatch) => {
  dispatch(requestStarted());
  return ApiService.events.myRsvps()
    .then((response) => {
      dispatch(fetchMyRsvpsSuccess(response.events));
    })
    .catch((response) => {
      dispatch(requestFailed(response.message));
    });
};

export const rsvp = (event) => {
  const user = new AuthService().getUser();
  const data = {
    event,
    user_id: user.sub,
  };
  return (dispatch) => {
    dispatch(rsvpLoading());
    return ApiService.events.rsvp(data)
      .then(() => {
        dispatch(rsvpSuccess());
      })
      .catch((response) => {
        try {
          response.then(error => dispatch(rsvpFailed(error.message)));
        } catch (error) {
          dispatch(rsvpFailed('Network Request Failed'));
        }
      });
  };
};


export const updateEvent = (event) => {
  const updatedEvent = Object.assign({}, event);
  return (dispatch) => {
    dispatch(requestStarted());
    return ApiService.events.update(updatedEvent)
      .then(() => {
        dispatch(savedEvent());
        history.replace('/');
      })
      .catch((response) => {
        try {
          response.then(error => dispatch(requestFailed(error.message)));
        } catch (error) {
          dispatch(requestFailed('Can Not Connect To The Server'));
        }
        history.replace('/my-events');
      });
  };
};


export const deleteEvent = eventId => (dispatch) => {
  dispatch(requestStarted());
  return ApiService.events.delete(eventId)
    .then(response => (response.error ?
      dispatch(requestFailed(response.error)) :
      dispatch(rsvpSuccess())))
    .catch((response) => {
      try {
        return response.then(error => dispatch(requestFailed(error.message)));
      } catch (error) {
        return dispatch(requestFailed(response.message));
      }
    });
};

export const fetchSingleEvent = (id, includeGuests = true) => {
  const auth = new AuthService();
  return (dispatch) => {
    dispatch(requestStarted());
    return fetch(`${eventsURL}${id}`)
      .then(response => response.json())
      .then(json => fetchCoordinates(json.event.address)
        .then((data) => {
          dispatch(fetchedCoordinates(data));
          dispatch(receiveSingleEvent(json.event));
          if (includeGuests) {
            try {
              if (auth.loggedIn() && auth.currentUserId() === json.event.user_id) {
                dispatch(doFetchGuests(json.event.id));
              }
            } catch (error) {
              // eslint-disable-next-line no-console
              console.log('the error is ', error);
            }
          }
        }))
      .catch((error) => {
        dispatch(requestFailed(error.message));
      });
  };
};
