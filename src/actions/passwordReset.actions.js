import ApiService from '../helpers/ApiService';
import { requestFailed, requestStarted, requestSuccess } from './api.actions';
import {EMAIL_SENT, RESET_TOKEN_ERROR, TOKEN_VERIFIED} from '../constants/action_types';
import history from '../helpers/history';

export const linkSent = () => ({
  type: EMAIL_SENT,
  linkSent: true,
});
export const tokenVerified = newToken => ({
  type: TOKEN_VERIFIED,
  resetToken: newToken,
});
export const resetTokenError = error => ({
  error,
  type: RESET_TOKEN_ERROR,
});
export const verifyToken = token => (dispatch) => {
  dispatch(requestStarted());
  return ApiService.user.verifyReset(token)
    .then((response) => {
      dispatch(tokenVerified(response.token));
      return response;
    })
    .catch((response) => {
      try {
        return response.then((res) => {
          dispatch(resetTokenError(res.message));
        });
      } catch (error) {
        return dispatch(resetTokenError('Request Failed'));
      }
    });
};
export const changePassword = (data, token) => (dispatch) => {
  dispatch(requestStarted());
  return ApiService.user.changePassword(data, token)
    .then((response) => {
      dispatch(requestSuccess());
      return response;
    })
    .catch((response) => {
      try {
        return response.then((res) => {
          dispatch(resetTokenError(res.message));
        });
      } catch (error) {
        return dispatch(resetTokenError('Request Failed'));
      }
    });
};
export const sendEmail = email => (dispatch) => {
  dispatch(requestStarted());
  return ApiService.user.sendEmail(email)
    .then((response) => {
      dispatch(linkSent());
      history.replace('/email-sent');
    })
    .catch((response) => {
      try {
        return response.then((res) => {
          dispatch(requestFailed(res.message));
        });
      } catch (error) {
        console.log('the error is ', error);
        return dispatch(requestFailed('Request Failed'));
      }
    });
};

