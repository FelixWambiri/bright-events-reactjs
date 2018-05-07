import { TOGGLE_DIALOG } from '../constants/action_types';
import { toggleDialog } from './confirmationDialogs.actions';
import expect from 'expect'

describe('Testing deletion confirmation modal', () => {
  it('changes state to open', () => {
    const open = false;
    const expectedAction = {
      type: TOGGLE_DIALOG,
      open: true,
    };
    expect(toggleDialog(open)).toEqual(expectedAction);
  });
});
