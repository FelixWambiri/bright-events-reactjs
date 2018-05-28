import { CLEAR_ERROR, REQUEST_FAILED, REQUEST_STARTED, REQUEST_SUCCESS } from '../constants/action_types';

// Generic actions for network requests


// This will trigger our loading view in our components
export const requestStarted = () => ({
  type: REQUEST_STARTED,
});

// Before leaving the page we make sure all errors are not passed to the next
export const clearError = () => ({ type: CLEAR_ERROR });

// whenever something goes wrong we notify our components of the same
export const requestFailed = error => ({
  type: REQUEST_FAILED,
  error,
});

// when a request that does not return anything succeed , we'll notify loading view to stop
export const requestSuccess = () => ({
  type: REQUEST_SUCCESS,
});
