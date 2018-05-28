import { combineReducers } from 'redux';
import events from './events';
import error from './error';
import loading from './loading';
import showEvent from './showEvent';
import drawerOpen from './../reducers/drawerReducer';
import deleteOpen from './../reducers/confirmationDialog.reducer';
import menuOpen from './../reducers/menu.toggler.reducer';
import token from './../reducers/token';
import map from './../reducers/map.reducer';
import report from '../reducers/reports.reducer';
import { reducer as formReducer } from 'redux-form';
import rsvp_loading from './rsvp_loading';
import categories from './categories.reducer';
import theme from '../reducers/theme.picker.reducer';
import guests from '../reducers/guests.reducer';
import myEvents from '../reducers/my-events.reducer';
import resetError from '../reducers/resetTokenError';
import resetToken from '../reducers/resetToken';
import searchBarOpen from '../reducers/searchBar.reducer';
import searchLoading from '../reducers/searchLoading';
import searchResults from '../reducers/search.reducers';
import searchNotFound from '../reducers/searchNotfound.reducer';
import showPassword from '../reducers/password.switcher.reducer';
import myRsvps from '../reducers/myRsvps.reducer';
import paginator from "../reducers/paginator"
export default combineReducers({
  events,
  error,
  resetError,
  resetToken,
  searchBarOpen,
  myRsvps,
    paginator,
  loading,
  showEvent,
  theme,
  myEvents,
  searchLoading,
  searchResults,
  searchNotFound,
  showPassword,
  guests,
  drawerOpen,
  menuOpen,
  token,
  map,
  categories,
  rsvp_loading,
  deleteOpen,
  report,
  form: formReducer,
});
