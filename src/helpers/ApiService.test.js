/* eslint-disable no-console */
import nock from 'nock';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  REQUEST_FAILED,
  REQUEST_STARTED,
} from '../constants/action_types';
import localStorage from 'mock-local-storage';
import { myEvents } from '../actions/events';

const mockStore = configureMockStore([thunk]);

describe('Tests events actions', () => {
  beforeEach(() => {
    global.window = {};
    window.localStorage = global.localStorage;
  });

  afterEach(() => {
    nock.cleanAll();
  });
  it('It shows error on ', () => {
    const payload = 'Network connectivity error';
    const expectedActions = [
      { type: REQUEST_STARTED },
      { type: REQUEST_FAILED, error: 'Network Request Failed' },
    ];
    const store = mockStore({ error: '' }, expectedActions);
    nock('http://localhost:5000/api/v1')
      .get('/events/my-events')
      .reply(200, 'awesome').log(console.log);
    store.dispatch(myEvents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
