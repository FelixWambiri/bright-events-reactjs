import {RSVP_FAILED, RSVP_LOADING, RSVP_SUCCESS
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