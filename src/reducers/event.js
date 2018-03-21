import {SAVE_EVENT_REQUEST, SAVE_EVENT_SUCCESS} from "../constants/action_types";

export default  (event={}, action)=> {
    switch (action.type){
        case SAVE_EVENT_SUCCESS:
            return action.event
    }
}