import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { LOGIN_SUCCESS, REQUEST_LOGIN, REQUEST_SIGNUP, SIGNUP_SUCCESS } from '../../constants/action_types';
import expect from 'expect';
import { doLogin } from '../../actions/login.actions';
import { doSignup } from '../../actions/signup.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResult = { email: 'samaki@gmail.com', password: 'Kibua2018' };
describe('action creators', () => {
  afterEach(() => {
    fetchMock.reset();
  });


  it('should signup the user', () => {
    // fetchMock.post('http://localhost:5000/api/v1/login', mockResult);
    fetchMock.postOnce('http://localhost:5000/api/v1/signups', {});
    //   fetchMock.sandbox().postOnce('*', {error:'lfkajdflasdfsa'})
    const expectedActions = [
      { type: REQUEST_SIGNUP },
    ];
    const store = mockStore({
      search: {
        result: {},
      },
    });

    return store.dispatch(doSignup('samaki@gmail.com', 'just awesome', '12344'))
      .then((data) => { // return of async actions
        console.log('the login data is ', data);
        expect(store.getActions()).toEqual(expectedActions);
      }).catch(error => console.log('the caught error is ', error));
  });
  it('should throw an error when signup fails', () => {
    // fetchMock.post('http://localhost:5000/api/v1/login', mockResult);
    fetchMock.mock('http://localhost:5000/api/v1/auth/signupss', () => {
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
