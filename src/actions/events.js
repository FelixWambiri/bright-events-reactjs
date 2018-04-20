import {
    FETCH_EVENTS_REQUEST, FETCH_EVENTS_SUCCESS, FETCH_MY_EVENTS_SUCCESS, RSVP_FAILED, RSVP_LOADING, RSVP_SUCCESS,
    SHOW_SINGLE_EVENT
} from "../constants/action_types";
import fetch from "cross-fetch"
import {requestFailed, requestStarted} from "./api.actions";
import MapService from "../helpers/MapService";
import {fetchedCoordinates} from "./map.actions";
import ApiService from "../helpers/ApiService";
import AuthService from "../helpers/AuthService";
import {eventsURL} from "../constants/urls";
import {doFetchGuests} from "./guests.action";
export const requestEvents = ()=>({
    type:FETCH_EVENTS_REQUEST
});


const fetchMyEventsSuccessful = events=>({
    type:FETCH_MY_EVENTS_SUCCESS,
    events
})

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

export const myEvents = ()=>{
    return dispatch =>{
        dispatch(requestStarted());
        ApiService.events.myEvents()
            .then((response)=>{
                dispatch(fetchMyEventsSuccessful(response.events));
            })
            .catch(response=>{
                try{
                    response.then(error=>dispatch(requestFailed(error.message)));
                }catch (error){
                    dispatch(requestFailed("Network Request Failed"))
                }

            })
    }
}

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
                    dispatch(rsvpFailed("Network Request Failed"))
                }

            })
    }
};
export const deleteEvent = (event_id)=>{
    console.log("delting an event ", event_id)
    return dispatch =>{
        dispatch(requestStarted());
        ApiService.events.delete(event_id)
            .then(()=>{
                dispatch(rsvpSuccess());
            })
            .catch(response=>{
                try{
                    response.then(error=>dispatch(requestFailed(error.message)));
                }catch (error){
                    dispatch(requestFailed("Network Request Failed"))
                }

            })
    }
};

export const fetchSingleEvent  = (id,includeGuests=true)=>{
    const auth = new AuthService();
    return dispatch =>{
        dispatch(requestEvents());
        return fetch(`${eventsURL}${id}`)
            .then(response=>response.json())
            .then(json=>{
                fetchCoordinates(json.event.address)
                    .then(data=>{
                        dispatch(fetchedCoordinates(data));
                        dispatch(receiveSingleEvent(json.event))
                        if(includeGuests){
                            try {
                                if(auth.loggedIn() && auth.currentUserId() === json.event.user_id){
                                    dispatch(doFetchGuests(json.event.id))
                                }
                            }catch(error){
                                console.log("the error is ", error)
                            }
                        }

                    })

            })
            .catch(error=>{
                dispatch(requestFailed(error.message))
            })
    }
}
