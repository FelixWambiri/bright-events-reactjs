import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import storage from 'mock-local-storage';

import {
  FETCH_EVENTS_SUCCESS, FETCH_MAP_SUCCESS,
  FETCH_MY_EVENTS_SUCCESS, LOGIN_SUCCESS,
  REQUEST_FAILED, REQUEST_LOGIN,
  REQUEST_STARTED, RSVP_LOADING, RSVP_SUCCESS, SAVE_EVENT_SUCCESS, SHOW_SINGLE_EVENT, UPDATE_EVENT_SUCCESS,
} from '../../constants/action_types';
import {
  deleteEvent,
  fetchEvents,
  fetchMyEventsSuccessful,
  fetchSingleEvent,
  myEvents, receiveEvents, receiveSingleEvent,
  rsvp,
  savedEvent,
  updateEvent,
} from '../../actions/events';
import { eventWithMapResponse, testEvents, testSingleEvent } from '../../helpers/testSampleData';
import nock from 'nock';
import { doLogin } from '../../actions/login.actions';
import { requestStarted } from '../../actions/api.actions';
import { saveEvent } from '../../actions/newEvent';
import {BASE_URL, eventsURL} from "../../constants/urls";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Mock events async actions', () => {
  beforeEach(() => {
    localStorage.clear();
    // remove callback
    localStorage.itemInsertionCallback = null;
    localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjU3MjEyMjMsImlhdCI6MTUyNTU0ODQyMywic3ViIjoxNH0.PWJof-UlxyDRi5ssbWWx0g3B7WNl6R3FwtQpBiQSKsc');
  });
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
    nock.cleanAll();
  });
  it('It dispatches get events', () => {
    const payload = testEvents;
    const expectedActions = [
      { type: REQUEST_STARTED },
      { type: FETCH_EVENTS_SUCCESS, events: payload, loading: false },
    ];
    const store = mockStore({ events: [] }, expectedActions);
    fetchMock.mock('*', { events: testEvents });
    store.dispatch(fetchEvents()).then((res) => {
      expect(store.getActions()).toEqual(expectedActions);
    }).catch(error => error);
  });
  it('throws an error when network is not available', () => {
    const expectedActions = [
      { type: REQUEST_STARTED },
      {
        type: REQUEST_FAILED,
        error: 'Network Request Failed',
      },
    ];
    const store = mockStore({ events: [] }, expectedActions);
    fetchMock.mock(eventsURL, () => {
      throw new Error('Network Request Failed');
    });
    store.dispatch(fetchEvents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('It dispatches fetch my events successfully ', () => {
    const expectedActions = [
      { type: REQUEST_STARTED },
      { type: FETCH_MY_EVENTS_SUCCESS, events: testEvents },
    ];
    const store = mockStore({ events: [] }, expectedActions);
    fetchMock.mock('*', { events: testEvents });
    store.dispatch(myEvents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    }).catch(error => console.log('an error occured', error));
  });

  it('It shows network error ', () => {
    const payload = 'Network connectivity error';
    const expectedActions = [
      { type: REQUEST_STARTED },
      { type: REQUEST_FAILED, error: 'Network Request Failed' },
    ];
    const store = mockStore({ error: '' }, expectedActions);
    nock(BASE_URL)
      .get('/events/my-events')
      .replyWithError(payload).log(console.log);
    store.dispatch(myEvents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('It shows single event ', () => {
    const store = mockStore({ event: {} }, eventWithMapResponse);
    fetchMock.getOnce(
      `${eventsURL}87`,
      { event: testSingleEvent, headers: { 'content-type': 'application/json' } },
    );
    store.dispatch(fetchSingleEvent(87, false)).then((res) => {
      expect(store.getActions()).toEqual(eventWithMapResponse);
    });
  });
  it('It updates an event ', () => {
    const expectedActions = [
      { type: REQUEST_STARTED },
      { type: UPDATE_EVENT_SUCCESS },
    ];
    const store = mockStore({ event: {} }, expectedActions);
    fetchMock.putOnce('*', { headers: { 'content-type': 'application/json' } });
    store.dispatch(updateEvent(87)).then(() => {
      expect(store.getActions()).toEqual(expectedActions).catch();
    });
  });
  it('It throws an error when updates fails ', () => {
    const expectedActions = [
      { type: REQUEST_STARTED },
      { type: UPDATE_EVENT_SUCCESS },
    ];
    const store = mockStore({ event: {} }, expectedActions);
    nock(BASE_URL)
      .put('/events/87')
      .replyWithError('Could not find an event with id 87').log(console.log);
    store.dispatch(updateEvent(87, false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('It throws an error when token is missing while deleting an event ', () => {
    const expectedActions = [
      { type: REQUEST_STARTED },
      { type: REQUEST_FAILED, error: 'Invalid Token , Please Login again' },
    ];
    localStorage.clear();
    const store = mockStore({ error: 'Invalid Token , Please Login again' }, expectedActions);
    fetchMock.mock(`${eventsURL}20`, () => {
      throw new Error('Invalid Token , Please Login again');
    });
    store.dispatch(deleteEvent(20)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('It throws an error when token is missing while deleting an event ', () => {
    const expectedActions = [
      { type: REQUEST_STARTED },
      { type: REQUEST_FAILED, error: 'Invalid Token , Please Login again' },
    ];
    localStorage.clear();
    const store = mockStore({ error: 'Invalid Token , Please Login again' }, expectedActions);
    // nock('http://localhost:5000/api/v1/events').intercept('/20', 'delete').reply(200).log(console.log);
    fetchMock.deleteOnce(`${eventsURL}20`, { error: 'Invalid Token , Please Login again' }, { headers: { 'content-type': 'application/json' } }).catch(500);
    store.dispatch(deleteEvent(20)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('It throws an error when event is not found ', () => {
    const expectedActions = [
      { type: REQUEST_STARTED },
      { type: REQUEST_FAILED, error: 'Event With ID 20 is not found' },
    ];
      // localStorage.clear()
    const store = mockStore({ error: '/' }, expectedActions);
    fetchMock.mock(`${eventsURL}20`, { error: 'Event With ID 20 is not found' });
    store.dispatch(deleteEvent(20)).then((res) => {
      expect(store.getActions()).toEqual(expectedActions);
    }).catch(error => console.log('the error is ', error));
  });
  it('It deletes an event ', () => {
    const expectedActions = [
      { type: REQUEST_STARTED },
      { type: RSVP_SUCCESS },
    ];
      // localStorage.clear()
    const store = mockStore({ error: '/' }, expectedActions);
    fetchMock.mock(`${eventsURL}20`, {});
    store.dispatch(deleteEvent(20)).then((res) => {
      expect(store.getActions()).toEqual(expectedActions);
    }).catch(error => console.log('the error is ', error));
  });
  it('throws an error when network is not available', () => {
    const expectedActions = [
      { type: REQUEST_STARTED },
      { type: REQUEST_FAILED, error: 'Network Request Failed' },
    ];
      // localStorage.clear()
    const store = mockStore({ error: '/' }, expectedActions);
    fetchMock.mock(`${eventsURL}20`, () => {
      throw new Error('Network Request Failed');
    });
    store.dispatch(deleteEvent(20)).then((res) => {
      expect(store.getActions()).toEqual(expectedActions);
    }).catch(error => console.log('the error is ', error));
  });


  it('It mocks rsvp ', () => {
    const expectedActions = [
      { type: RSVP_LOADING },
      { type: RSVP_SUCCESS },
    ];
    // localStorage.clear()
    const store = mockStore({ error: '/' }, expectedActions);
    fetchMock.mock(`${eventsURL}20/rsvp`, {});
    store.dispatch(rsvp(20)).then((res) => {
      expect(store.getActions()).toEqual(expectedActions);
    }).catch(error => console.log('the error is ', error));
  });

  describe('Mock Sync Event Actions', () => {
    it('Mock saved Event sync action', () => {
      const expectedAction = {
        type: UPDATE_EVENT_SUCCESS,
      };
      expect(savedEvent()).toEqual(expectedAction);
    });
    it('Mock fetch my events success  sync action', () => {
      const expectedAction = {
        type: FETCH_MY_EVENTS_SUCCESS,
        events: [],
      };
      expect(fetchMyEventsSuccessful([])).toEqual(expectedAction);
    });
    it('Mock receive event sync action', () => {
      const expectedAction = {
        type: FETCH_EVENTS_SUCCESS,
        events: [],
        loading: false,
      };
      expect(receiveEvents([])).toEqual(expectedAction);
    });
    it('Mock saved Event sync event', () => {
      const expectedAction = {
        type: SHOW_SINGLE_EVENT,
        event: {},
      };
      expect(receiveSingleEvent({})).toEqual(expectedAction);
    });
    it('Mock saving event', () => {
        const expectedAction = [
            { type: REQUEST_STARTED },
            { type: SAVE_EVENT_SUCCESS },
        ];
      const store = mockStore({ error: '/' }, expectedAction);
      fetchMock.postOnce(eventsURL, {});

      store.dispatch(saveEvent({}, '')).then(() => {
        expect(store.getEvents()).toEqual(expectedAction);
      });
    });
  });
});

