import {
    EVENT_FORM_ERROR,
    FETCH_EVENTS_REQUEST, FETCH_EVENTS_SUCCESS, REQUEST_FAILED, RSVP_FAILED, RSVP_LOADING, RSVP_SUCCESS,
    SHOW_SINGLE_EVENT
} from "../constants/action_types";
import fetch from "cross-fetch"
import {requestFailed, requestStarted} from "./api.actions";
import MapService from "../helpers/MapService";
import {fetchedCoordinates} from "./map.actions";
import history from "../helpers/history";
import {savedEvent, savingEvent} from "./new_event";
import ApiService from "../helpers/ApiService";
import AuthService from "../helpers/AuthService";
export const requestEvents = ()=>({
    type:FETCH_EVENTS_REQUEST
});

export const addEventFailed = error =>({
    type:EVENT_FORM_ERROR,
    error
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
const rsvpSuccess = ()=>
    ({
    type:RSVP_SUCCESS
});

const rsvpLoading = ()=>({
    type:RSVP_LOADING
})

const rsvpFailed = (error)=>({
    type:RSVP_FAILED,
    error
})

export const fetchEvents  = ()=>{
    return dispatch =>{
        dispatch(requestStarted())
        return fetch('http://localhost:5000/api/v1/events/')
            .then(response=>response.json())
            .then(json=>dispatch(receiveEvents(json.events)))
            .catch(error=>{
                dispatch(requestFailed(error.message))
            })
    }
}

const fetchCoordinates = address =>{
    return MapService(address)
        .then(resp=>{
            const { lat, lng } = resp.results[0].geometry.location;
           return {lat,lng}
        })
        .catch(()=>{
            return `Could Not Show Map For ${address}`

        })
};

export const rsvp = (event)=>{
    const user = new AuthService().getUser()
    const data = {
        event,
        user_id:user.sub
    }
    return dispatch =>{
        dispatch(rsvpLoading());
        ApiService.events.rsvp(data)
            .then(()=>{
                dispatch(rsvpSuccess());
            })
            .catch(response=>{
                try{
                    response.then(error=>dispatch(rsvpFailed(error.message)));
                }catch (error){
                    // response.then(error=>dispatch(rsvpFailed(error.message)));
                    dispatch(rsvpFailed("Network Request Failed"))
                }

            })
    }
};

export const fetchSingleEvent  = (id)=>{
    return dispatch =>{
        dispatch(requestEvents());
        return fetch(`http://localhost:5000/api/v1/events/${id}`)
            .then(response=>response.json())
            .then(json=>{
                fetchCoordinates(json.event.address)
                    .then(data=>{
                        dispatch(fetchedCoordinates(data))
                        dispatch(receiveSingleEvent(json.event))
                    })

            })
            .catch(error=>{
                dispatch(requestFailed(error.message))
            })
    }
}
