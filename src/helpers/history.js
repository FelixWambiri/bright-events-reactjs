import { createBrowserHistory } from 'history';
import store from '../store/store';
import { clearError } from '../actions/api.actions';

const history = createBrowserHistory();
history.listen((location, action) => {
  store.dispatch(clearError());
});
export default history;
