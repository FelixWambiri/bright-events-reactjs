import {
    FETCH_EVENTS_FAILED, FETCH_EVENTS_REQUEST, FETCH_EVENTS_SUCCESS, REQUEST_FAILED, SHOW_SINGLE_EVENT
} from "../constants/action_types";
import fetch from "cross-fetch"
export const requestEvents = ()=>({
    type:FETCH_EVENTS_REQUEST
});

export const showSingleEvent = event =>({
    type:SHOW_SINGLE_EVENT,
    event
});

const receiveEvents = events=>
    ({
    type:FETCH_EVENTS_SUCCESS,
    events,
        loading:false
});
const receiveSingleEvent = event=>
    ({
    type:SHOW_SINGLE_EVENT,
    event
});
export const eventFetchFailed = error =>({
    type:REQUEST_FAILED,
    error
});


export const fetchEvents  = ()=>{
    return dispatch =>{
        dispatch(requestEvents())
        return fetch('http://localhost:5000/api/v1/events/')
            .then(response=>response.json())
            .then(json=>dispatch(receiveEvents(json.events)))
            .catch(error=>{
                dispatch(eventFetchFailed(error.message))
            })
    }
}

export const fetchSingleEvent  = (id)=>{
    return dispatch =>{
        dispatch(requestEvents());
        return fetch(`http://localhost:5000/api/v1/events/${id}`)
            .then(response=>response.json())
            .then(json=>dispatch(receiveSingleEvent(json.event)))
            .catch(error=>{
                dispatch(eventFetchFailed(error.message))
            })
    }
}
