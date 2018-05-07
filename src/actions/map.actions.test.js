import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import { FETCH_MAP_SUCCESS, REQUEST_FAILED, REQUEST_STARTED } from '../constants/action_types';
import { fetchCoordinates } from './map.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('map async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('Returns appropriate message when location is not found', () => {
    const address = 'dar es salaam';
    fetchMock
      .getOnce(`https://maps.google.com/maps/api/geocode/json?address=${address}&key=AIzaSyD2VmJLaKQpTdow188zsahY20a-bZ0pnAw`, { error: '', headers: { 'content-type': 'application/json' } });


    const expectedActions = [
      { type: REQUEST_STARTED },
      { type: REQUEST_FAILED, error: `Could Not Show Map For <b>${address}</b>` },
    ];
    const store = mockStore({ error: '' });

    return store.dispatch(fetchCoordinates('dar es salaam')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
