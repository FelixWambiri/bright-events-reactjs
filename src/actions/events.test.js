import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import storage from 'mock-local-storage';

import {
  FETCH_EVENTS_SUCCESS, FETCH_MAP_SUCCESS,
  FETCH_MY_EVENTS_SUCCESS,
  REQUEST_FAILED,
  REQUEST_STARTED, RSVP_SUCCESS, SHOW_SINGLE_EVENT, UPDATE_EVENT_SUCCESS,
} from '../constants/action_types';
import { deleteEvent, fetchEvents, fetchSingleEvent, myEvents, updateEvent } from './events';
import { testEvents } from '../helpers/testSampleData';
import nock from 'nock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Mock events async actions', () => {
  beforeEach(() => {
    localStorage.clear();
    // remove callback
    localStorage.itemInsertionCallback = null;
    localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjU3MjEyMjMsImlhdCI6MTUyNTU0ODQyMywic3ViIjoxNH0.PWJof-UlxyDRi5ssbWWx0g3B7WNl6R3FwtQpBiQSKsc');
  });
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
    nock.cleanAll();
  });
  // it('It dispatches get events', () => {
  //   const payload = testEvents;
  //   const expectedActions = [
  //     { type: REQUEST_STARTED },
  //     { type: FETCH_EVENTS_SUCCESS, events: payload, loading: false },
  //   ];
  //   const store = mockStore({ events: [] }, expectedActions);
  //   fetchMock
  //     .getOnce('*', { events: payload, headers: { 'content-type': 'application/json' } });
  //
  //   store.dispatch(fetchEvents()).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   });
  // });
  // it('It dispatches get events', () => {
  //   const expectedActions = [
  //     { type: REQUEST_STARTED },
  //     {
  //       type: REQUEST_FAILED,
  //       error: 'request to http://localhost:5000/api/v1/events/ failed, reason: Network connectivity error',
  //     },
  //   ];
  //   const store = mockStore({ events: [] }, expectedActions);
  //   nock('http://localhost:5000/api/v1')
  //     .get('/events/')
  //     .replyWithError('Network connectivity error');
  //   store.dispatch(fetchEvents()).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   });
  // });
  //
  // it('It dispatches fetch my events successfully ', () => {
  //   const payload = [];
  //   const expectedActions = [
  //     { type: REQUEST_STARTED },
  //     { type: FETCH_MY_EVENTS_SUCCESS, events: payload },
  //   ];
  //   const store = mockStore({ error: '' }, expectedActions);
  //   nock('http://localhost:5000/api/v1')
  //     .get('/events/my-events')
  //     .reply(200, { events: payload }).log(console.log);
  //   store.dispatch(myEvents()).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   }).catch(error => console.log('an error occured', error));
  // });
  //
  // it('It shows network error ', () => {
  //   const payload = 'Network connectivity error';
  //   const expectedActions = [
  //     { type: REQUEST_STARTED },
  //     { type: REQUEST_FAILED, error: 'Network Request Failed' },
  //   ];
  //   const store = mockStore({ error: '' }, expectedActions);
  //   nock('http://localhost:5000/api/v1')
  //     .get('/events/my-events')
  //     .replyWithError(payload).log(console.log);
  //   store.dispatch(myEvents()).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   });
  // });
  // it('It shows single event ', () => {
  //   const payload = {
  //     event: {
  //       address: 'Magomeni, Dar es salaam',
  //       category: 'Fifa Competition',
  //       category_id: 31,
  //       created_at: 'Tue, 24 Apr 2018 07:47:09 GMT',
  //       description: "It'll be awesome",
  //       end_date: 'Sat, 28 Apr 2018 00:00:00 GMT',
  //       id: 87,
  //       image: null,
  //       name: 'Fifa game competition 2019',
  //       price: 'Free',
  //       start_date: 'Wed, 25 Apr 2018 00:00:00 GMT',
  //       user_id: 21,
  //     },
  //     message: 'Event Retrieved Successfully',
  //   };
  //   const expectedActions = [
  //     { type: REQUEST_STARTED },
  //     { type: FETCH_MAP_SUCCESS, coordinates: 'Could Not Show Map For Magomeni, Dar es salaam' },
  //     { type: SHOW_SINGLE_EVENT, event: payload.event },
  //   ];
  //   const store = mockStore({ event: {} }, expectedActions);
  //   fetchMock.getOnce('http://localhost:5000/api/v1/events/87', { events: payload, headers: { 'content-type': 'application/json' } });
  //   fetchMock.put('http://test.com', 200);
  //   store.dispatch(fetchSingleEvent(87, false)).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   });
  // });
  // it('It updates an event ', () => {
  //   const expectedActions = [
  //     { type: REQUEST_STARTED },
  //     { type: UPDATE_EVENT_SUCCESS },
  //   ];
  //   const store = mockStore({ event: {} }, expectedActions);
  //   fetchMock.getOnce('http://localhost:5000/api/v1/events/87', { headers: { 'content-type': 'application/json' } });
  //   store.dispatch(updateEvent(87)).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions).catch();
  //   });
  // });
  // it('It throws an error when updates fails ', () => {
  //   const expectedActions = [
  //     { type: REQUEST_STARTED },
  //     { type: UPDATE_EVENT_SUCCESS },
  //   ];
  //   const store = mockStore({ event: {} }, expectedActions);
  //   nock('http://localhost:5000/api/v1')
  //     .put('/events/87')
  //     .replyWithError('Could not find an event with id 87').log(console.log);
  //   store.dispatch(updateEvent(87, false)).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   });
  // });
  // it('It throws an error when token is missing while deleting an event ', () => {
  //   const expectedActions = [
  //     { type: REQUEST_STARTED },
  //     { type: REQUEST_FAILED, error: 'Invalid Token , Please Login again' },
  //   ];
  //   localStorage.clear();
  //   const store = mockStore({ error: 'Invalid Token , Please Login again' }, expectedActions);
  //   // nock('http://localhost:5000/api/v1/events').intercept('/20', 'delete').reply(200).log(console.log);
  //   // fetchMock.deleteOnce('http://localhost:5000/api/v1/events/20', { headers: { 'content-type': 'application/json', Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQzMDg4ODksImlhdCI6MTUyNDEzNjA4OSwic3ViIjoyMX0.PqpaT2oyhxbsm-6ADn_oTjYmQvsDa3WjscoriHYV4as' } });
  //   store.dispatch(deleteEvent(20)).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   });
  // });
  // it('It throws an error when token is missing while deleting an event ', () => {
  //   const expectedActions = [
  //     { type: REQUEST_STARTED },
  //     { type: REQUEST_FAILED, error: 'Invalid Token , Please Login again' },
  //   ];
  //   localStorage.clear();
  //   const store = mockStore({ error: 'Invalid Token , Please Login again' }, expectedActions);
  //   // nock('http://localhost:5000/api/v1/events').intercept('/20', 'delete').reply(200).log(console.log);
  //   fetchMock.deleteOnce('http://localhost:5000/api/v1/events/20', { error: ' something is no t awesome' }, { headers: { 'content-type': 'application/json' } }).catch(500);
  //   store.dispatch(deleteEvent(20)).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   });
  // });
  it('It throws an error when event is not found ', () => {
    const expectedActions = [
      { type: REQUEST_STARTED },
      { type: REQUEST_FAILED, error: 'Event With ID 20 is not found' },
    ];
      // localStorage.clear()
    const store = mockStore({ error: 'Invalid Token , Please Login again' }, expectedActions);
    nock('http://localhost:5000/api/v1/events').intercept('/20', 'delete').reply(200, {}).log(console.log);
    // fetchMock.delete('http://localhost:5000/api/v1/events/20', { error: '' }, { headers: { 'content-type': 'application/json' } });

    // fetchMock.mock({
    //   name: 'share',
    //   matcher: '/events/20',
    //   method: 'DELETE',
    //   response: 'ok',
    // })
    //   .catch();
    store.dispatch(deleteEvent(20)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

