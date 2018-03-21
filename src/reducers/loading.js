import {
    FETCH_EVENTS_FAILED, FETCH_EVENTS_REQUEST, FETCH_EVENTS_SUCCESS, LOGIN_FAILED, LOGIN_SUCCESS, REQUEST_FAILED,
    REQUEST_LOGIN,
    REQUEST_SIGNUP,
    SAVE_EVENT_FAILED,
    SAVE_EVENT_REQUEST, SIGNUP_SUCCESS
} from "../constants/action_types";

export default (isLoading=false, action)=>{
    switch (action.type){
        case FETCH_EVENTS_REQUEST:
        case SAVE_EVENT_REQUEST:
        case REQUEST_SIGNUP:
        case REQUEST_LOGIN:
            return true;
        case REQUEST_FAILED:
        case LOGIN_SUCCESS:
        case FETCH_EVENTS_SUCCESS:
        case SIGNUP_SUCCESS:
            return false;
        default:
            return isLoading
    }
}