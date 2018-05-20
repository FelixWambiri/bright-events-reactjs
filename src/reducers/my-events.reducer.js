import {FETCH_MY_EVENTS_SUCCESS} from "../constants/action_types";

export default (events=[], action)=>{
    switch (action.type){
        case FETCH_MY_EVENTS_SUCCESS:
            return action.events
        default:
            return events;
    }
}