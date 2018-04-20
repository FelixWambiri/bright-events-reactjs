import {FETCH_GUESTS_SUCCESS} from "../constants/action_types";

export default (guests=[], action)=>{
    switch (action.type){
        case FETCH_GUESTS_SUCCESS:
            return action.guests;
        default:
            return guests;
    }
}