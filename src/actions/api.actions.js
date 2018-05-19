import { CLEAR_ERROR, REQUEST_FAILED, REQUEST_STARTED, REQUEST_SUCCESS } from '../constants/action_types';

export const requestStarted = () => ({
  type: REQUEST_STARTED,
});

export const clearError = () => ({ type: CLEAR_ERROR });

export const requestFailed = error => ({
  type: REQUEST_FAILED,
  error,
});

export const requestSuccess = () => ({
  type: REQUEST_SUCCESS,
});
