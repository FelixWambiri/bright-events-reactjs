import {SEARCH_SUCCESS} from "../constants/action_types";

export default (events=[], action)=>{
    switch (action.type){
        case SEARCH_SUCCESS:
            return action.events;
        default:
            return events;
    }
}