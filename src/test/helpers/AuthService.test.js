import nock from 'nock';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import JWT from 'jsonwebtoken';
import expect from 'expect';
import AuthService from '../../helpers/AuthService';
import { REQUEST_FAILED, REQUEST_STARTED } from '../../constants/action_types';
import { fetchEvents } from '../../actions/events';

describe('Mock events async actions', () => {
  const generateToken = () => {
    const token = JWT.sign({ name: 'samwel Charles' }, 'supersecretstrongitem');
    localStorage.setItem('token', token);
  };
  beforeEach(() => {
    localStorage.clear();
    // remove callback
    localStorage.itemInsertionCallback = null;
    generateToken();
  });
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
    nock.cleanAll();
  });
  const auth = new AuthService();
  it('it show login status correctly', () => {
    console.log('the token is ', localStorage.getItem('token'));
    expect(auth.loggedIn()).toEqual(true);
  });
  it('it show logout user  correctly', () => {
    auth.logout();
    expect(auth.loggedIn()).toEqual(false);
  });
  it('it decode token correctly', () => {
    generateToken();
    expect(auth.loggedIn()).toEqual(true);
    expect(auth.getUser().name).toEqual('samwel Charles');
  });
});

