import { REQUEST_SIGNUP, SIGNUP_SUCCESS } from '../constants/action_types';
import { requestFailed } from './api.actions';
import { registerURL } from '../constants/urls';


export const requestSignup = () => ({
  type: REQUEST_SIGNUP,
});
export const signupSuccess = token => ({
  type: SIGNUP_SUCCESS,
  token,
});


export const doSignup = (email, name, password) => (dispatch) => {
  dispatch(requestSignup());
  return fetch(registerURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      name,
      password,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then((err) => {
        dispatch(requestFailed(err.message));
      });
    });
};
