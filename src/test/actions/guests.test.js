/* eslint-disable no-console */
import nock from 'nock';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { fetchCategories } from '../../actions/categories.actions';
import { CATEGORIES_FETCHED, FETCH_GUESTS_SUCCESS, REQUEST_FAILED, REQUEST_STARTED } from '../../constants/action_types';
import { doFetchGuests } from '../../actions/guests.action';

const mockStore = configureMockStore([thunk]);

describe('fetchUserEpic', () => {
  beforeEach(() => {
  });

  afterEach(() => {
    nock.cleanAll();
  });
  it('It dispatches get categories', () => {
    const payload = [];
    const expectedActions = [
      { type: REQUEST_STARTED },
      { type: FETCH_GUESTS_SUCCESS, guests: payload },
    ];
    const store = mockStore({ guests: [] }, expectedActions);
    nock('http://localhost:5000/api/v1')
      .get('/events/3/guests')
      .reply(200, { guests: payload }).log(console.log);
    store.dispatch(doFetchGuests(3)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
