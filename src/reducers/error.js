import {
    FETCH_EVENTS_SUCCESS,
    LOGIN_SUCCESS, REQUEST_FAILED, REQUEST_STARTED
} from "../constants/action_types";

export default (error='', action)=>{
    switch (action.type){
        case REQUEST_FAILED:
            return action.error;
        case LOGIN_SUCCESS:
        case FETCH_EVENTS_SUCCESS:
        case REQUEST_STARTED:
            return '';
        default:
            return error;
    }
}