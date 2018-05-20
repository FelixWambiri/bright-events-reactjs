/* eslint-disable no-console */
import nock from 'nock';
import expect from 'expect';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import {
  REQUEST_FAILED,
  REQUEST_STARTED,
} from '../../constants/action_types';
import localStorage from 'mock-local-storage';
import { myEvents } from '../../actions/events';
import {BASE_URL, eventsURL} from '../../constants/urls';

const mockStore = configureMockStore([thunk]);

describe('Tests events actions', () => {
  beforeEach(() => {
    global.window = {};
    window.localStorage = global.localStorage;
  });

  afterEach(() => {
    nock.cleanAll();
  });
  it('It shows error on failed fetch events', () => {
    const payload = 'Network connectivity error';
    const expectedActions = [{ type: 'REQUEST_STARTED' }, { events: undefined, type: 'FETCH_MY_EVENTS_SUCCESS' }];
    const store = mockStore({ error: '' });
    fetchMock
      .getOnce(`${eventsURL}my-events`, { error: '', headers: { 'content-type': 'application/json' } });

    store.dispatch(myEvents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    }).catch(error => console.log('the ezra is ', error));
  });
});
