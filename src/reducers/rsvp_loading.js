import {
    FETCH_EVENTS_SUCCESS, FETCH_MAP_SUCCESS, LOGIN_SUCCESS, REQUEST_FAILED,
    REQUEST_STARTED, RSVP_FAILED, RSVP_LOADING, RSVP_SUCCESS, SIGNUP_SUCCESS
} from "../constants/action_types";

export default (isLoading=false, action)=>{
    switch (action.type){
        case RSVP_LOADING:
            return true;
        case RSVP_SUCCESS:
        case RSVP_FAILED:
            return false;
        default:
            return isLoading
    }
}