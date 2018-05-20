/* eslint-disable no-console */
import nock from 'nock';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { fetchCategories } from '../../actions/categories.actions';
import { CATEGORIES_FETCHED, REQUEST_FAILED, REQUEST_STARTED } from '../../constants/action_types';

const mockStore = configureMockStore([thunk]);

describe('Mock categories async actions', () => {
  beforeEach(() => {
  });

  afterEach(() => {
    nock.cleanAll();
  });
  it('It dispatches get categories', () => {
    const payload = [];
    const expectedActions = [
      { type: REQUEST_STARTED },
      { type: CATEGORIES_FETCHED, categories: payload },
    ];
    const store = mockStore({ categories: [] }, expectedActions);
    nock('http://localhost:5000/api/v1')
      .get('/events/categories')
      .reply(200, { categories: payload });
    store.dispatch(fetchCategories()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('It dispatches handles errors appropriately', () => {
    const payload = 'Network connectivity error';
    const expectedActions = [
      { type: REQUEST_STARTED },
      { type: REQUEST_FAILED, error: 'request to http://localhost:5000/api/v1/events/categories failed, reason: Network connectivity error' },
    ];
    const store = mockStore({ error: '' }, expectedActions);
    nock('http://localhost:5000/api/v1')
      .get('/events/categories')
      .replyWithError(payload)
    store.dispatch(fetchCategories()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
