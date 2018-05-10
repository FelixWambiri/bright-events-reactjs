import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { LOGIN_SUCCESS, REQUEST_LOGIN } from '../../constants/action_types';
import expect from 'expect';
import { doLogin } from '../../actions/login.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResult = { email: 'samaki@gmail.com', password: 'Kibua2018' };
describe('action creators', () => {
  afterEach(() => {
    fetchMock.reset();
  });


  it('should login the user', () => {
    // fetchMock.post('http://localhost:5000/api/v1/login', mockResult);
    fetchMock.postOnce('*', { token: 'This is one fake token' });
    //   fetchMock.sandbox().postOnce('*', {error:'lfkajdflasdfsa'})
    const expectedActions = [
      { type: REQUEST_LOGIN },
      { type: LOGIN_SUCCESS, token: 'This is one fake token' },
    ];
    const store = mockStore({
      search: {
        result: {},
      },
    });

    return store.dispatch(doLogin('samaki@gmail.com', '12344'))
      .then((data) => { // return of async actions
        console.log('the login data is ', data);
        expect(store.getActions()).toEqual(expectedActions);
      }).catch(error => console.log('the caught error is ', error));
  });
  it('should throw an error', () => {
    // fetchMock.post('http://localhost:5000/api/v1/login', mockResult);
    fetchMock.postOnce('http://localhost:5000/api/v1/auth/login', () => {
      throw Error('Something went wrong');
    });
    //   fetchMock.sandbox().postOnce('*', {error:'lfkajdflasdfsa'})
    const expectedActions = [
      { type: REQUEST_LOGIN },
      { type: LOGIN_SUCCESS, token: 'This is one fake token' },
    ];
    const store = mockStore({
      search: {
        result: {},
      },
    });

    return store.dispatch(doLogin('samaki@gmail.com', '12344'))
      .then((data) => { // return of async actions
        console.log('the login data is ', data);
        expect(store.getActions()).toEqual(expectedActions);
      }).catch(error => console.log('the error is ', error));
  });
});
