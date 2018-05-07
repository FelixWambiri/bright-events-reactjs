import { LOGIN_SUCCESS, REQUEST_FAILED, REQUEST_LOGIN } from '../constants/action_types';
import ApiService from '../helpers/ApiService';
import history from './../helpers/history';

const requestLogin = () => ({
  type: REQUEST_LOGIN,
});
const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  token,
});

const requestFailed = error => ({
  type: REQUEST_FAILED,
  error,
});
export const doLogin = (email, password) => (dispatch) => {
  console.log('email is ', email, password);
  dispatch(requestLogin());
 return  ApiService.user.login({ email, password })
    .then((response) => {
      const token = response.token;
      dispatch(loginSuccess(token));
      localStorage.setItem('token', token);
      history.replace('/dashboard');
    })
    .catch((response) => {
      try {
        response.then(error => dispatch(requestFailed(error.message)));
      } catch (e) {
        dispatch(requestFailed('Could not connect to the server'));
      }

      history.replace('/login');
    });
};
