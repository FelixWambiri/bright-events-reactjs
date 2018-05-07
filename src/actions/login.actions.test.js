import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { LOGIN_SUCCESS, REQUEST_STARTED } from '../constants/action_types';
import expect from 'expect';
import { doLogin } from './login.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResult = { email: 'samaki@gmail.com', password: 'Kibua2018' };
describe('action creators', () => {
  afterEach(() => {
    fetchMock.reset();
  });


  it('should login the user', () => {
    // fetchMock.post('http://localhost:5000/api/v1/login', mockResult);
    fetchMock.getOnce('*', { events: {}, headers: { 'content-type': 'application/json' } });

    const expectedActions = [
      { type: REQUEST_STARTED },
      { type: LOGIN_SUCCESS },
    ];
    const store = mockStore({
      search: {
        result: {},
      },
    });

    return store.dispatch(doLogin('samaki@gmail.com', '12344'))
      .then((data) => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
