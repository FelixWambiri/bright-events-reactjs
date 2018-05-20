import { TOGGLE_DRAWER} from '../../constants/action_types';
import { toggleDialog } from '../../actions/confirmationDialogs.actions';
import expect from 'expect';
import {toggleDrawer} from "../../actions/drawer";

describe('Testing deletion confirmation modal', () => {
  it('changes state to open', () => {
    const open = false;
    const expectedAction = {
      type: TOGGLE_DRAWER,
      open: true,
    };
    expect(toggleDrawer(open)).toEqual(expectedAction);
  });
});
