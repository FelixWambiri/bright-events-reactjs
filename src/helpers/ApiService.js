import { categoriesURL, CHANGE_URL, eventsURL, loginURL, RESET_URL, VERIFY_URL } from '../constants/urls';
import AuthService from './AuthService';
import 'isomorphic-fetch';

function send(data = {}, method = 'POST', auth = false, url) {
  console.log(`Sending ${method} Request to ${url} `);
  const authService = new AuthService();
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth ? `Bearer ${authService.getToken()}` : null,
    },
    body: method === 'POST' ? JSON.stringify(data) : null,
  }).then(status);
}


function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response.json());
  }
  return Promise.reject(response.json());
}


function save(data = {}, method = 'POST', auth = false, url) {
  const formData = new FormData();
  formData.append('address', data.address);
  data.category.image ? formData.append('image', data.category.image, data.category.image.name.trim()) : '';
  formData.append('category', data.category.category);
  formData.append('description', data.description);
  formData.append('start_date', data.start_date);
  formData.append('end_date', data.end_date);
  formData.append('name', data.name);
  formData.append('price', data.price);

  const authService = new AuthService();
  return fetch(url, {
    method,
    headers: {
      Authorization: auth ? `Bearer ${authService.getToken()}` : null,
    },
    body: formData,
  }).then(status);
}
function update(data = {}, method = 'PUT', auth = false, url) {
  console.log('the data sis ', data);

  const formData = new FormData();
  formData.append('address', data.address);
  formData.append('image', data.image);
  formData.append('category', data.category);
  formData.append('description', data.description);
  formData.append('start_date', data.start_date);
  formData.append('end_date', data.end_date);
  formData.append('name', data.name);
  formData.append('price', data.price);

  const authService = new AuthService();
  return fetch(url, {
    method,
    headers: {
      Authorization: auth ? `Bearer ${authService.getToken()}` : null,
    },
    body: formData,
  }).then(status);
}


export default {
  user: {
    login: credentials => send(credentials, 'POST', false, loginURL),
    signup: data => send(data),
    sendEmail: email => send({ email }, 'POST', false, RESET_URL),
    verifyReset: token => send({}, 'GET', false, `${VERIFY_URL}${token}`),
    changePassword: (data, token) => send(data, 'POST', false, `${CHANGE_URL}/${token}`),
  },
  events: {
    guests: eventId => send({}, 'GET', true, `${eventsURL}${eventId}/guests`),
    save: data => save(data, 'POST', true, eventsURL),
    delete: id => send(id, 'DELETE', true, eventsURL + id),
    rsvp: data => send(data, 'POST', true, `${eventsURL}${data.event}/rsvp`),
    reports: () => send({}, 'GET', true, `${eventsURL}reports`),
    myEvents: () => send({}, 'GET', true, `${eventsURL}my-events`),
    update: event => update(event, 'PUT', true, eventsURL + event.id),
    search: (query,type) => send({}, 'GET', false, `${eventsURL}${type}?q=${query}`),

  },
  categories: {
    fetch: () => send({}, 'GET', false, categoriesURL),
  },
};
