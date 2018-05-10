import nock from 'nock';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import JWT from 'jsonwebtoken';
import expect from 'expect';
import { getCurrent, setTheme, removeTheme } from '../../helpers/ThemePickerService';
import ThemePickerService from '../../helpers/ThemePickerService';

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
  const themer = new ThemePickerService();

  it('shows null when no theme is applied', () => {
    expect(themer.getCurrent()).toEqual(null);
  });
  it('shows null when no theme is applied', () => {
    localStorage.setItem('theme', 'awesome');
    expect(themer.getCurrent()).toEqual('awesome');
  });
  it('shows null when no theme is applied', () => {
    themer.setTheme('another');
    expect(themer.getCurrent()).toEqual('another');
  });
  // it('it show logout user  correctly', () => {
  //   auth.logout();
  //   expect(auth.loggedIn()).toEqual(false);
  // });
  // it('it decode token correctly', () => {
  //   generateToken();
  //   expect(auth.loggedIn()).toEqual(true);
  //   expect(auth.getUser().name).toEqual('samwel Charles');
  // });
});

