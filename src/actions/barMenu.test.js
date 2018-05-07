import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { toggleMenu } from './barMenu';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe(' Toggles the drawer successfully', () => {
  const store = mockStore({ open: false });
  it('should successfully open the drawer ', () => {
    const openDrawer = store.dispatch(toggleMenu(store.getState()));
    expect(openDrawer).toEqual({ element: undefined, open: false, type: 'TOGGLE_MENU' });
  });
  it('should successfully close the drawer ', () => {
    const openDrawer = store.dispatch(toggleMenu(false));
    expect(openDrawer).toEqual({ element: undefined, open: true, type: 'TOGGLE_MENU' });
  });
});
