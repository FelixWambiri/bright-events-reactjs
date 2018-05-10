import { FETCH_MAP_SUCCESS } from '../constants/action_types';
import MapService from '../helpers/MapService';
import { requestFailed, requestStarted } from './api.actions';

export const fetchedCoordinates = coordinates => ({
  type: FETCH_MAP_SUCCESS,
  coordinates,
});

export const fetchCoordinates = address => (dispatch) => {
  dispatch(requestStarted());
  return MapService(address)
    .then((resp) => {
      const { lat, lng } = resp.results[0].geometry.location;
      dispatch(fetchedCoordinates({ lat, lng }));
    })
    .catch((error) => {
        console.log("th ere ", error)
      dispatch(requestFailed(`Could Not Show Map For <b>${address}</b>`));
    });
};
