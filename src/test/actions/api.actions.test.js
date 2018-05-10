import expect from 'expect';
import { requestStarted } from '../../actions/api.actions';
import { REQUEST_STARTED } from '../../constants/action_types';

describe('api actions ', () => {
  it('should create api actions to indicate request started', () => {
    const expectedAction = {
      type: REQUEST_STARTED,
    };
    expect(requestStarted()).toEqual(expectedAction);
  });
});