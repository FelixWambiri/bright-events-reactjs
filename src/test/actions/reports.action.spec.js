import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { LOGIN_SUCCESS, REQUEST_LOGIN, REQUEST_SIGNUP, SIGNUP_SUCCESS } from '../../constants/action_types';
import expect from 'expect';
import { doLogin } from '../../actions/login.actions';
import { doSignup } from '../../actions/signup.actions';
import { fetchReports } from '../../actions/reports.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResult = { email: 'samaki@gmail.com', password: 'Kibua2018' };
describe('action creators', () => {
  afterEach(() => {
    fetchMock.reset();
  });


  it('should fetch reports', () => {
    // fetchMock.post('http://localhost:5000/api/v1/login', mockResult);
    fetchMock.mock('http://localhost:5000/api/v1/events/reports', {});
    //   fetchMock.sandbox().postOnce('*', {error:'lfkajdflasdfsa'})
    const expectedActions = [{ type: 'REQUEST_STARTED' }, { data: {}, type: 'FETCH_REPORTS_SUCCESS' }, { error: 'An Error Occurred while connecting to the server', type: 'REQUEST_FAILED' }];
    const store = mockStore({
      search: {
        result: {},
      },
    });

    return store.dispatch(fetchReports())
      .then((data) => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      }).catch(error => console.log('the caught error is ', error));
  });
});
