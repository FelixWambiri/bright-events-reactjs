import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

const defaultState = {
  categories: [],
  deleteOpen: false,
  drawerOpen: false,
  error: '',
  events: [],
  form: {},
  guests: [],
  loading: false,
  menuOpen: false,
  myEvents: [],
  report: {},
  rsvp_loading: false,
  theme: {
    root: {},
    style: { appBar: {} },
  },
};

let store;
let wrapper;
const mockStore = configureStore();
describe('Mocks App.js', () => {
  beforeEach(() => {
    store = mockStore(defaultState);
    console.log('the state is ', store.getState());
  });
  it('renders without crashing', () => {
    wrapper = mount(<Provider store={store}><App /></Provider>);
  });
});

