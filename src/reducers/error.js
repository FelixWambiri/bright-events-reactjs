import {
    LOGIN_SUCCESS, REQUEST_FAILED
} from "../constants/action_types";

export default (error='', action)=>{
    switch (action.type){
        case REQUEST_FAILED:
            return action.error;
        case LOGIN_SUCCESS:
            return "";
        default:
            return error;
    }
}