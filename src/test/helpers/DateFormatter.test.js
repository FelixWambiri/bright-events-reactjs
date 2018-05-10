/* eslint-disable no-console */
import DateFormatter from '../../helpers/DateFormatter';
import { REQUEST_STARTED } from '../../constants/action_types';
import expect from 'expect';
import { requestStarted } from '../../actions/api.actions';


describe('api actions ', () => {
  it('Test date formatter', () => {
    expect(DateFormatter('2018-08-11')).toEqual('2018-08-11');
  });
});
