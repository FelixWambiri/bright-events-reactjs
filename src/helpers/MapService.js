import Geocode from 'react-geocode';
Geocode.setApiKey('AIzaSyD2VmJLaKQpTdow188zsahY20a-bZ0pnAw');
export default address => Geocode.fromAddress(address).then(status);
function status(response) {
  if (response.status === 'OK') {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
}
